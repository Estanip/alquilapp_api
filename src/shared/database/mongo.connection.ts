import dotenv from 'dotenv';
import mongoose, { Connection } from 'mongoose';
import { LoggerService } from '../utils/logger.service';

dotenv.config();
const { ENVIRONMENT, MONGO_HOST_DEV, MONGO_HOST_PROD, MONGO_DB_NAME_DEV, MONGO_DB_NAME_PROD } =
    process.env;

export class MongooseConnection {
    private static _instance: MongooseConnection;
    private _connection: Connection | null = null;
    private _uri: string;
    private logger: LoggerService;

    private constructor(logger: LoggerService = new LoggerService('Database')) {
        this.logger = logger;
        this._uri =
            ENVIRONMENT === 'development'
                ? `${MONGO_HOST_DEV}/${MONGO_DB_NAME_DEV}`
                : `${MONGO_HOST_PROD}/${MONGO_DB_NAME_PROD}`;
    }

    public static getInstance(): MongooseConnection {
        if (!MongooseConnection._instance) MongooseConnection._instance = new MongooseConnection();
        return MongooseConnection._instance;
    }

    private async connect(): Promise<void> {
        mongoose.set('strictQuery', true);
        return await mongoose
            .connect(this._uri)
            .then(() => {
                this.logger.log('Database succesfully connected');
            })
            .catch((error) => {
                this.logger.error('Error connecting to MongoDB:', error);
            });
    }

    private async disconnect(): Promise<void> {
        if (this._connection) {
            mongoose.disconnect();
            this._connection = null;
            this.logger.log('MongoDB disconnected successfully');
        }
    }

    get connection(): Promise<void> {
        return this.connect();
    }
    get disconnection(): Promise<void> {
        return this.disconnect();
    }
}
