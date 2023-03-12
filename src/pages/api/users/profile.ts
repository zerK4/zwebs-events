/**
 * @author Sebastian Pavel
 * ? Profile handler function
 */

import defaultHandler from "../../../helpers/apiHandlers/defaultHandler"
import { createProfile } from '../../../helpers/prismaFunctions/profile'
import { getOne } from "../../../helpers/prismaFunctions/users"
import { infoLogger, errLogger } from "../../../utils/logger"

export default defaultHandler.post(async (req, res) => {
    const document = req.body
    const { firstname, lastname, email, age } = document

    if (document.email) {
        try {
            const user = await getOne(email)
            const profile = await createProfile({
                firstname: firstname,
                lastname: lastname,
                userid: user.id,
                age: age
            })
            infoLogger.info(`Send profile ${firstname + " " + lastname} to frot end after it was created!`)
            return res.status(200).send({
                    profile: profile,
                    message: `Profile for ${firstname + " " + lastname} created successfull!`
                })
        } catch (err) {
            errLogger.error(`Error found at creating profile api route || ${err}`)
            throw new Error(`Error found at creating profile api route || ${err}`)
        }
    } else {
        errLogger.error(`No info was provided to create the user profile!`)
        return res.status(401).send({
                message: `No info was provided to create the profile!`
            })
    }
})