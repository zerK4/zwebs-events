/**
 * @author Sebastian Pavel
 * ? Default resets functions
 */

import defaultHandler from "../../../helpers/apiHandlers/defaultHandler";
import { verifyEmail } from "../../../helpers/emailServer/email";
import prisma from "../../../helpers/prismaFunctions/prisma";
import { getOne } from "../../../helpers/prismaFunctions/users";
import { errLogger, infoLogger } from "../../../utils/logger";
import { hash } from "bcrypt";

export default defaultHandler.post(async (req, res) => {
    const { email } = req.body
    const user = await getOne(email)
    if (email) {
        verifyEmail({
            userEmail: email,
            url: `${process.env.URL}auth/${user!.confirmationToken}`,
            subject: 'Change password request.',
            message: 'If you did not made this request please do not touch this button!',
            button: 'Change password'
        })
        infoLogger.info(`Email sent to ${email} with a link to reset the password!`)
        return res.status(200).send({
                message: `Email sent to reset the password to ${email}`
            })
    }
}).put(async (req, res) => {
    const { motif, email, password } = req.body
    switch (motif) {
        case "PW":
            hash(password, 10, async (err, hash) => {
                if (!err && hash) {
                    const user = await prisma.user.update({
                        where: {
                            email: email
                        },
                        data: {
                            token: hash
                        }
                    })
                    infoLogger.info(`Password changed successfully for ${email}`)
                    return res.status(200).send({
                            message: `Password changed successfully for ${email}`
                        })
                } else {
                    errLogger.error(`Got an error changing the password || ${err}`)
                    console.error(err)
                    return res.status(500).send({
                            message: `Got an error trying to change the password || ${err}`
                        })
                }
            })
    }
})