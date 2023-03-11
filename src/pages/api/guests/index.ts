import defaultHandler from "../../../helpers/apiHandlers/defaultHandler";
import { confirmGuestCreation } from "../../../helpers/emailServer/email";
import { getEvent } from "../../../helpers/prismaFunctions/event";
import { createGuest, getOneGuest } from '../../../helpers/prismaFunctions/guests'
import prisma from "../../../helpers/prismaFunctions/prisma";
import { errLogger, infoLogger } from "../../../utils/logger";
import { uuid } from "uuidv4";

export default defaultHandler.post(async (req, res) => {
    const { event, firstname, lastname, email, phone, location, vegan, accomodation, kids } = req.body;

    const existsEvent = await getEvent(event)
    const existsGuest = await getOneGuest(email)
    const eventManager = await prisma.user.findUnique({
        where: {
            id: existsEvent.userId
        }, 
        include: {
            profile: true,
        }
    })
    const token = uuid();

    if (existsEvent && !existsGuest) {
        const guest = await createGuest(event, firstname, lastname, email, phone, location, vegan, accomodation, kids, token)

        infoLogger.info(`Guest ${firstname + " " + lastname} with email ${email} created successfully!`)
        const document = {
            userEmail: eventManager.email,
            firstname: eventManager.profile.firstName,
            guest: guest,
            url: `${process.env.URL}`,
            subject: `Guest created successfully!`,
            message: `Hello ${eventManager.profile.firstName}, You have a new guest which joined your event!`
        }
        confirmGuestCreation(document)
        return res.status(200).send({
                message: "Guest successfully created!",
                data: guest
            })
    }
    if (existsGuest) {
        errLogger.error(`Guest  with email ${email} is already registered for this event!`)
        return res.status(401).send({
                message: `This email address, ${email}, has been already used for this event!`,
                data: existsGuest
            })
    }

    errLogger.error(`Guest ${name} with email ${email} was not created!`)
    errLogger.error(`Event ${event} was not found in our DB.`)
    return res.status(404).send({
            message: `Event ${event} was not found and we did not created the guest!`,
        })
})