import defaultHandler from '../../../../helpers/apiHandlers/defaultHandler'
import { hash } from 'bcrypt'
import { createUser } from '../../../../helpers/prismaFunctions/users'
import { verifyEmail } from '../../../../helpers/emailServer/email'
import { errLogger } from '../../../../utils/logger'

const salts = 10
const url = process.env.URL || 'http://localhost:3000/'

export default defaultHandler.post(async (req, res) => {
    const { password, username, email } = await req.body
    let confirmationToken: string;

    if (email && password && username) {
        hash(email, 1, async (err, hash) => {
            confirmationToken = hash
        })

        hash(password, salts, async (err, hash) => {
            const user = await createUser(username, email, hash, confirmationToken)
            if (err) {
                errLogger.error(`Something broke at hashing password, message: ${err}`)
                res.status(500).send({
                    message: "Something wrong happened!"
                })
            }
            res.status(200).send({
                user: user
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
