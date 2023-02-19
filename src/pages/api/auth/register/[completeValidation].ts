import defaultHandler from "../../../../helpers/apiHandlers/defaultHandler";
import { verifyEmail } from "../../../../helpers/emailServer/email";
import prisma from "../../../../helpers/prismaFunctions/prisma";
import { getOne } from "../../../../helpers/prismaFunctions/users";
import { errLogger, infoLogger } from "../../../../utils/logger";

const url = process.env.URL

export default defaultHandler.post(async (req, res) => {
    const { email } = req.body;
    const user = await getOne(email);
    const { confirmationToken } = user;

    if (email) {
        if (!user.verified) {
            verifyEmail({
                userEmail: email,
                url: `${url}api/auth/register/${confirmationToken}`,
                subject: 'Confirm your email address.',
                message: 'Heeey, we send you another one, please confirm the email address this time!',
                button: 'Confirm email'
            })
            infoLogger.info(`Email sent to ${email} asking to confirm the account.`)
            res.status(200).send({
                message: `Email successfully sent to ${email}`
            })
        } else {
            errLogger.error(`${email} is already validated!`)
            throw new Error(`${email} is already validated!`)
        }
    } else {
        errLogger.error('No email was provided!')
        res.status(401).send({
            message: 'No email was provided!'
        })
        throw new Error(`no email was provided!`)
    }
}).get(async (req, res) => {
    const { completeValidation } = req.query
    try {
        const user = await prisma.user.update({
            where: {
                confirmationToken: completeValidation as string
            },
            data: {
                verified: true
            }
        })
        infoLogger.info(`${user.email} validated successfully!`)
        res.status(200).send({
            message: `${user.email} confirmed successfully!`
        })
    } catch (err) {
        errLogger.error('Nothing to validate!')
        res.status(404).send({
            message: "Nothing to validate!"
        })
        throw new Error('Nothing to validate!')
    }
})