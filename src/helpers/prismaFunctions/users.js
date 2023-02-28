/**
 * @author Sebastian Pavel
 * ? Prisma users handler
 */

import prisma from "./prisma";
import { errLogger, infoLogger } from "../../utils/logger";

export const createUser = async (username, email, password, token, role) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                username: username,
                token: password,
                verified: false,
                confirmationToken: token,
                role: role,
            }
        })
        infoLogger.info(`User email: ${email}, username: ${username} created successfully.`)
        delete user.token
        return user;
    } catch(err) {
        errLogger.error(`Got an error creating an user, ${err}`)
    }
}

export const getOne = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }, 
            include: {
                profile: true
            }
        })
        infoLogger.info(`Requested ${email} from DB.`)
        return user
    } catch (err) {
        errLogger.error(`Got an error fetching one user, userEmail: ${email}, err: ${err}`)
    }
}

export const getAll = async () => {
    try {
        const data = await prisma.user.findMany({
            include: {
                profile: true
            }
        })
        infoLogger.info('Requested all users from DB')
        data.forEach((x) => {delete x.token})
        return data
    } catch (err) {
        errLogger.error(`Got an error fetching all users, ${err}`)
    }
}
