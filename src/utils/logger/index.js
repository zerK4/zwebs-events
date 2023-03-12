import { createLogger, format } from "winston";
import prisma from "../../helpers/prismaFunctions/prisma";
import { PrismaTransporter } from "./prismaWinston";

export const errLogger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    defaultMeta: { service: 'zWebs' },
    transports: [
        new PrismaTransporter({
        level: "http",
        prisma,
        tableName: 'errorLog'
        }),
    ],
})

export const infoLogger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    defaultMeta: { service: 'zWebs' },
    transports: [
        new PrismaTransporter({
            level: "http",
            prisma,
            tableName: 'infoLog'
        }),
    ],
})
