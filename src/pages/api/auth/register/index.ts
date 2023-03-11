/**
 * @author Sebastian Pavel
 * @date February 2023
 * ? Registration function
 */

import defaultHandler from '../../../../helpers/apiHandlers/defaultHandler'
import { hash } from 'bcrypt'
import { createUser, getOne } from '../../../../helpers/prismaFunctions/users'
import { getEvent } from '../../../../helpers/prismaFunctions/event'
import { verifyEmail } from '../../../../helpers/emailServer/email'
import { errLogger } from '../../../../utils/logger'
import { uuid } from 'uuidv4'

const salts = 10
const url = process.env.URL || 'http://localhost:3000/'

export default defaultHandler.post(async (req, res) => {
    const { eventCode, password, username, email } = await req.body
    let confirmationToken: string;
    const event = await getEvent(eventCode)
    const user = await getOne(email)
    if (user) {
        res.status(401).send({
            message: `This email is already registered!`
        })
    }
    if (!event) {
        res.status(404).send({
            message: "Event was not found!"
        })
    }

    if (email && password && username && event) {
        confirmationToken = uuid()
        const role = "default"

        hash(password, salts, async (err, hash) => {
            const user = await createUser(username, email, hash, confirmationToken, role, eventCode)
            if (err) {
                errLogger.error(`Something broke at hashing password, message: ${err}`)
                res.status(500).send({
                    message: "Something wrong happened!"
                })
            }
            res.status(200).send({
                user: user,
                message: `We have sent a confirmation email to ${email}!`
            })
            verifyEmail({
                userEmail: email,
                url: `${url}user/confirmation/${confirmationToken}`,
                subject: "Confirm your email address!",
                message: "Hey, we need you to confirm your email address in order to let you in our system!",
                button: 'Confirm email'
            })
        })
    } else {
        res.send({
            message: 'nothing to create!'
        })
        errLogger.error('No data added to the post request!')
    }
})
