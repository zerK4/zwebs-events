import defaultHandler from "../../../helpers/apiHandlers/defaultHandler";
import { confirmGuestEmail } from "../../../helpers/emailServer/email";
import prisma from "../../../helpers/prismaFunctions/prisma";
import { errLogger, infoLogger } from "../../../utils/logger";

export default defaultHandler.get(async (req, res) => {
    const { token, firstname } = req.query
    const guest = await prisma.guest.findUnique({
        where: {
            token: token as string,
        }
    })

    try {
        const document = {
            subject: `Confirmation email request, ${firstname}`,
            userEmail: guest.email,
            firstname: firstname,
            url: `http://localhost:3000/guests/modifyProfile?token=${token}`,
            message: `To modify your profile go ahead access the link and follow instructions!`
        }
        confirmGuestEmail(document)
    
        infoLogger.info(`Email successfully sent to ${guest.email}.`)
        return res.status(200).send({ 
            message: `Email was successfully sent to ${guest.email}.`
         });
    } catch (err) {
        errLogger.error(`We could not process this request: ${err}`)
        return res.status(500).send({
            message: `We could not process this request: ${err}`
        })
    }
}).put(async (req, res) => {
    const { id, phone, location, vegan, accomodation, kids } = req.body

    try {
        const guest = await prisma.guest.update({
            where: {
                id: id, 
            }, 
            data: {
                phoneNumber: phone,
                location: location,
                vegan: vegan,
                accomodation: accomodation,
                kids: kids
            }
        })
        infoLogger.info(`Guest ${id} was updated successfully!`)
        res.status(200).send({
            message: `Guest ${guest.firstName} was updated successfully!`,
            data: guest
        })
    } catch (err) {
        errLogger.error(`Guest ${id} was not updated || err: ${err}`)
        return res.status(500).send({
            message: `Guest was not updated!`
        })
    }

})