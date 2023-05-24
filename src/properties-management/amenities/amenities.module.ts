import { Module } from '@nestjs/common';
import { AmenitiesController } from './amenities.controller';
import { AmenitiesService } from './amenities.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Amenities, AmenitiesSchema } from './amenities.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Amenities.name, schema: AmenitiesSchema }]),],
  controllers: [AmenitiesController],
  providers: [AmenitiesService]
})
export class AmenitiesModule {}
