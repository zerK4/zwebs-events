/**
 * @author Sebastian Pavel
 * @date February 2023
 * ? Registration function
 */

import defaultHandler from '../../../../helpers/apiHandlers/defaultHandler'
import { hash } from 'bcrypt'
import { createUser, getOne } from '../../../../helpers/prismaFunctions/users'
import { verifyEmail } from '../../../../helpers/emailServer/email'
import { errLogger } from '../../../../utils/logger'
import { uuid } from 'uuidv4'

const salts = 10
const url = process.env.URL || 'http://localhost:3000/'

export default defaultHandler.post(async (req, res) => {
    const { password, username, email } = await req.body
    let confirmationToken: string;
    const user = await getOne(email)
    if (user) {
        errLogger.error(`User with email ${email} already exists!`)
        return res.status(401).send({
                message: `This email is already registered!`
            })
    }

    if (email && password && username) {
        confirmationToken = uuid()
        const role = "default"

        hash(password, salts, async (err, hash) => {
            const user = await createUser(username, email, hash, confirmationToken, role)
            if (err) {
                errLogger.error(`Something broke at hashing password, message: ${err}`)
                return res.status(500).send({
                        message: "Something wrong happened!"
                    })
            }
            verifyEmail({
                userEmail: email,
                url: `${url}user/confirmation/${confirmationToken}`,
                subject: "Confirm your email address!",
                message: "Hey, we need you to confirm your email address in order to let you in our system!",
                button: 'Confirm email'
            })
            return res.status(200).send({
                    user: user,
                    message: `We have sent a confirmation email to ${email}!`
                })
        })
    } else {
        errLogger.error('No data added to the post request!')
        return res.send({
                message: 'nothing to create!'
            })
    }
})
