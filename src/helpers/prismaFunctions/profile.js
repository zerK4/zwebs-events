import prisma from "./prisma";
import { errLogger, infoLogger } from "../../utils/logger";

export const createProfile = async (document) => {
    const { age, firstname, lastname, userid } = document
    if (document) {
        try {
            const profile = await prisma.profile.create({
                data: {
                    userID: userid,
                    age: age,
                    firstName: firstname,
                    lastName: lastname,
                }
            })
            infoLogger.info(`Profile created for ${firstname + " " + lastname}`)
            return profile;
        } catch (err) {
            errLogger.error(`Issue encountered at creating profile through prisma! || ${err}`);
            throw new Error(`Issue encountered at creating profile through prisma! || ${err}`);
        }
    } else {
        errLogger.error(`No document provided to create the profile!`)
        throw new Error(`No document provided to create the profile!`)
    }
}