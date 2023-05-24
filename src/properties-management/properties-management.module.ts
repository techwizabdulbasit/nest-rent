import { Module } from '@nestjs/common';
import { AmenitiesModule } from './amenities/amenities.module';
import { AmenityCategoriesModule } from './amenity-categories/amenity-categories.module';
import { LocationModule } from './location/location.module';
import { ImagesModule } from './images/images.module';
import { PropertiesModule } from './properties/properties.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PropertyCategoriesModule } from './property-categories/property-categories.module';
import { FloorPlanModule } from './floor-plan/floor-plan.module';
import { BedsBathsModule } from './beds-baths/beds-baths.module';

@Module({
    imports: [AmenitiesModule, LocationModule, ImagesModule, PropertiesModule, ReviewsModule, PropertyCategoriesModule, AmenityCategoriesModule, FloorPlanModule, BedsBathsModule],
})
export class PropertiesManagementModule {}
