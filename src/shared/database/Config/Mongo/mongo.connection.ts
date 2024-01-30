import mongoose, { Connection, MongooseError } from 'mongoose';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/utils/logger/logger.service';

@Injectable()
export class MongooseConnection {
    private static _instance: MongooseConnection;
    private _connection: Connection | null = null;
    private logger: LoggerService = new LoggerService('Database');

    private constructor() {}

    public static getInstance(): MongooseConnection {
        if (!MongooseConnection._instance) MongooseConnection._instance = new MongooseConnection();
        return MongooseConnection._instance;
    }

    public set(uri: string): MongooseModuleFactoryOptions {
        return {
            connectionErrorFactory: (error: MongooseError) => {
                new LoggerService('Database').error(error);
                return error;
            },
            connectionFactory: () =>
                new LoggerService('Database').log('Database succesfully connected'),
            retryAttempts: 5,
            retryDelay: 10,
            lazyConnection: true,
        };
    }

    private async disconnect(): Promise<void> {
        if (this._connection) {
            mongoose.disconnect();
            this._connection = null;
            this.logger.log('MongoDB disconnected successfully');
        }
    }

    protected get disconnection(): Promise<void> {
        return this.disconnect();
    }
}
