import defaultHandler from "../../../helpers/apiHandlers/defaultHandler";
import { getOneGuest } from "../../../helpers/prismaFunctions/guests";
import { errLogger, infoLogger } from "../../../utils/logger";

export default defaultHandler.post(async (req, res) => {
    const { email } = req.body;
    const existsGuest = await getOneGuest(email)

    if (existsGuest) {
        infoLogger.info(`Guest ${email} was requested on the search guest page!`)
        return res.status(200).send({
                data: existsGuest,
                message: "Guest is present!"
        })
    } else {
        errLogger.error(`Guest ${email} was not found in database!`)
        return res.status(404).send({
            message: "This guest is not participating",
        })
    }
    
})