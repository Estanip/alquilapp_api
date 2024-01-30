import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { database_name, database_uri } from '../Config/configuration';

@Module({
    imports: [
        MongooseModule.forRoot(database_uri, {
            connectionName: database_name,
        }),
    ],
})
export class DatabaseModule {}
