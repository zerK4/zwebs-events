import { createLogger, format, transports } from "winston";
import prisma from "../../helpers/prismaFunctions/prisma";
import { PrismaWinstonTransporter } from "./prismaWinston";

export const errLogger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    defaultMeta: { service: 'zWebs' },
    transports: [
        new PrismaWinstonTransporter({
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
        new PrismaWinstonTransporter({
            level: "http",
            prisma,
            tableName: 'infoLog'
            }),
    ],
})
