import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG } from '../Config/configuration';

@Module({
  imports: [
    MongooseModule.forRoot(CONFIG.db.uri, {
      connectionName: CONFIG.db.name,
    }),
  ],
})
export class DatabaseModule {}
