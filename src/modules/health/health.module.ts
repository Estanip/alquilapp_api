import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { CONFIG } from 'src/shared/Config/configuration';
import { TerminusLogger } from 'src/shared/utils/logger/terminus-logger.service';
import { HealthController } from './health.controller';

@Module({
  imports: [
    MongooseModule.forRoot(CONFIG.db.uri),
    TerminusModule.forRoot({ logger: TerminusLogger, errorLogStyle: 'pretty' }),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
