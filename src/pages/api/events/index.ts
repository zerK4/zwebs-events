/**
 * @author Sebastian Pavel
 * @date March 2023
 * ? Function to handle the events
 */

import defaultHandler from "../../../helpers/apiHandlers/defaultHandler";
import auth from "../../../helpers/apiHandlers/auth";
import { createEvent, getAllEvents, getEvent } from "../../../helpers/prismaFunctions/event";
import { errLogger, infoLogger } from "../../../utils/logger";
import { confirmEventCreation } from "../../../helpers/emailServer/email";

export default auth(defaultHandler.get(async (req, res) => {
    const events = await getAllEvents()
    res.status(200).send({
        data: events,
        message: 'Events received'
    })
}).post(async (req, res) => {
    const { eventCode, eventName, eventDate, eventLocation, eventManager } = req.body

    const exists = await getEvent(eventCode)

    if (exists) {
        res.status(401).send({
            message: 'Event with the same code exists!'
        })
        errLogger.error(`${eventCode} already exists!`)
    }

    if (!req.body) {
        res.status(401).send({
            message: "Nothing to create!"
        })
        errLogger.error('Event fields were not completed!')
    }

    const event = await createEvent(eventCode, eventName, eventDate, eventLocation, eventManager.id)
    res.status(201).send({
        event: event,
        message: 'Congrats, your event was created!'
    })
    confirmEventCreation({
        userEmail: eventManager.email,
        url: `${process.env.URL}`,
        subject: `Event created successfully!`,
        message: `Hello ${eventManager.profile.firstName}, your event was successfully created and configured for you. If you want to check it smash the button!`
    })
    infoLogger.info(`Event ${eventCode} created and sent to FE.`)
}))