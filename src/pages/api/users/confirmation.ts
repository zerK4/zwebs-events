/**
 * @author Sebastian Pavel
 * ? Confirmation update function
 */

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
        res.status(200).send({
            message: `${user.email} verified successfully!`,
            confirmed: user.verified
        })
    } catch (err) {
        errLogger.error(`Got an error updating the user. || ${user.email} || error: ${err}`)
        res.status(500).send({
            message: `Got an error updating the user! || ${err}`
        })
    }
})