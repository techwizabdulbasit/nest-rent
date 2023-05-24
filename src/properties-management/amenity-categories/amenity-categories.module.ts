import { Module } from '@nestjs/common';
import { AmenityCategoriesController } from './amenity-categories.controller';
import { AmenityCategoriesService } from './amenity-categories.service';

@Module({
  controllers: [AmenityCategoriesController],
  providers: [AmenityCategoriesService]
})
export class AmenityCategoriesModule {}
