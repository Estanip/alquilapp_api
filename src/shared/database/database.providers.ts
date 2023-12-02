import { MongooseConnection } from './mongo.connection';

const mongooseInstance = MongooseConnection.getInstance();
const mongoDBConnection = {
    provide: 'MONGO_DB_CONNECTION',
    useFactory: () => {
        mongooseInstance.connection;
    },
};

export const databaseProviders = [mongoDBConnection];
