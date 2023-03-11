/**
 * @author Sebastian Pavel
 * @date March 2023
 * ? events handler
 */

import prisma from "./prisma";
import { errLogger, infoLogger } from "../../utils/logger";

export const getEvent = async (eventCode) => {
    try {
        const event = await prisma.event.findUnique({
            where: {
                eventCode: eventCode
            }
        })
        infoLogger.info(`Found event ${event.eventName} on DB.`)
        return event
    } catch (err) {
        errLogger.error(`Error getting event ${eventCode} on DB. || ${err}`)
    }
}

export const createEvent = async (eventCode, eventName, eventDate, eventLocation, eventManager) => {
    try {
        const event = await prisma.event.create({
            data: {
                eventCode: eventCode,
                eventName: eventName,
                eventDate: eventDate,
                eventLocation: eventLocation,
                userId: eventManager
            }
        })
        infoLogger.info(`Created event ${event.eventName} on DB.`)
        return event
    } catch (err) {
        errLogger.error(`Error creating event ${eventName} on DB. || ${err}`)
    }
}

export const getAllEvents = async () => {
    try {
        const data = await prisma.event.findMany({})
        infoLogger.info('Requested all events from DB')
        return data
    } catch (err) {
        errLogger.error(`Got an error fetching all events, ${err}`)
    }
}