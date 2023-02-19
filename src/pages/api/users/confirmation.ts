import defaultHandler from "../../../helpers/apiHandlers/defaultHandler";
import prisma from "../../../helpers/prismaFunctions/prisma";
import { errLogger } from "../../../utils/logger";
import { infoLogger } from "../../../utils/logger";

export default defaultHandler.post(async (req, res) => {
    const { id } = await req.body
    let user: any;

    try {
        user = await prisma.user.update({
            where: {
                confirmationToken: id
            },
            data: {
                verified: true
            }
        })
        infoLogger.info(`${user.email} was successfully verified!`)
    } catch (err) {
        errLogger.error(`Got an error updating the user. || ${user.email}`)
        throw new Error(err)
    }

    res.status(200).send({
        message: `${user.email} verified successfully!`,
        confirmed: user.verified
    })
})