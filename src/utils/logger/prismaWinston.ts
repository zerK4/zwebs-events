import { PrismaClient } from '@prisma/client'
import Transport, { type TransportStreamOptions } from 'winston-transport'

export interface PrismaTransporterOptions extends TransportStreamOptions {
    prisma: PrismaClient;
    tableName?: string;
  }

export interface ILogInfo {
    level: string;
    message: string;
}
export class PrismaTransporter extends Transport {
    private prisma: PrismaClient;
    private tableName: string;
    
    constructor(options: PrismaTransporterOptions) {
        super(options);

        this.prisma = options.prisma;
        this.tableName = options.tableName;
    }

    log(
        info: ILogInfo,
        callback?: (error?: Error, value?: unknown) => void
      ): void {
    
        // get log content
        const { level, message } = info;
    
        this.prisma[this.tableName]
        .create({
            data: {
            level,
            message,
            timestamp: new Date(),
            },
        })
        .then(() => {
            setImmediate(() => {
            this.emit("logged", info);
            });
    
        return callback && callback(undefined, true);
        })
        .catch((err: Error) => {
            setImmediate(() => {
            this.emit("error", err);
            });

            return callback && callback(err, null);
        });
      }
}