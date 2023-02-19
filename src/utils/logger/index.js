import { createLogger, format, transports } from "winston";

const myFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

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
            filename: 'logs/allLogs.log',
            level: 'error'
        }),
        new transports.File({
            filename: 'logs/errorLogs.log',
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
            filename: 'logs/allLogs.log',
            level: 'info'
        }),
        new transports.File({
            filename: 'logs/innfoLogs.log',
            level: 'info'
        })
    ],
})
