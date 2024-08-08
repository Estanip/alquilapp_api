import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { CourtController } from './court.controller';
import { CourtRepository } from './court.repository';
import { CourtService } from './court.service';
import { Court, CourtSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: Court.name,
          collection: CONFIG.models.COURTS,
          useFactory: () => CourtSchema,
        },
      ],
      CONFIG.db.name,
    ),
  ],
  controllers: [CourtController],
  providers: [CourtService, CourtRepository],
})
export class CourtModule {}
