import { Module } from '@nestjs/common';
import { BedsBathsController } from './beds-baths.controller';
import { BedsBathsService } from './beds-baths.service';

@Module({
  controllers: [BedsBathsController],
  providers: [BedsBathsService]
})
export class BedsBathsModule {}
