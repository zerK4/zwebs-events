import { createLogger, format, transports } from "winston";
import createFolderIfNotExists from '../logsFolderCheck'

const myFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
  
const logFolder = createFolderIfNotExists('logs')

export const errLogger = createLogger({
    level: 'error',
    format: format.combine(
        format.label({ label: 'Right now!'}),
        format.timestamp(),
        myFormat,
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: `${logFolder}/allLogs.log`,
            level: 'error'
        }),
        new transports.File({
            filename: `${logFolder}/errorLogs.log`,
            level: 'error'
        })
    ],
})

export const infoLogger = createLogger({
    level: 'info',
    format: format.combine(
        format.label({ label: 'Right now!'}),
        format.timestamp(),
        myFormat,
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: `${logFolder}/allLogs.log`,
            level: 'info'
        }),
        new transports.File({
            filename: `${logFolder}/innfoLogs.log`,
            level: 'info'
        })
    ],
})
