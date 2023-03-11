/**
 * @author Sebastian Pavel
 * @date March 2023
 * ? Prisma guests handler
 */

 import prisma from "./prisma";
 import { errLogger, infoLogger } from "../../utils/logger";
 
 export const createGuest = async (event, firstname, lastname, email, phone, location, vegan, accomodation, kids, token) => {
     try {
         const guest = await prisma.guest.create({
             data: {
                 token: token,
                 eventId: event,
                 firstName: firstname,
                 lastName: lastname,
                 email: email,
                 phoneNumber: phone,
                 location: location,
                 vegan: vegan,
                 accomodation: accomodation,
                 kids: kids
             }
         })
         infoLogger.info(`Guest: ${firstname, lastname}, email: ${email} created successfully.`)
         return guest;
     } catch(err) {
         errLogger.error(`Got an error creating a guest, ${err}`)
     }
 }
 
 export const getOneGuest = async (email) => {
     try {
         const guest = await prisma.guest.findUnique({
             where: {
                 email: email
             }
         })
         infoLogger.info(`Requested ${email} from DB.`)
         return guest
     } catch (err) {
         errLogger.error(`Got an error fetching one guest, guestEmail: ${email}, err: ${err}`)
     }
 }
 
 export const getAllGuests = async () => {
     try {
         const data = await prisma.guest.findMany({})
         infoLogger.info('Requested all users from DB')
         return data
     } catch (err) {
         errLogger.error(`Got an error fetching all guests, ${err}`)
     }
 }
 