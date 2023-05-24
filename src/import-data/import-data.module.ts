import { Module } from '@nestjs/common';
import { ImportDataController } from './import-data.controller';
import { ImportDataService } from './import-data.service';
// import { CsvParser } from 'nest-csv-parser';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertyDocument, PropertySchema } from '../properties-management/properties/properties.entity';

import { User, UserDocument, UserSchema } from '../users-management/users/user.entity';
import { AmenityCategories, AmenityCategoriesDocument, AmenityCategoriesSchema } from '../properties-management/amenity-categories/amenity-categories.entity';
import { PropertyCategories, PropertyCategoriesDocument, PropertyCategoriesSchema } from '../properties-management/property-categories/property-categories.entity';
import { Cities, CitiesSchema, Countries, CountriesSchema, States, StatesSchema } from '../properties-management/location/location.entity';
import { Amenities, AmenitiesSchema } from '../properties-management/amenities/amenities.entity';
import { Images, ImagesDocument, ImagesSchema } from '../properties-management/images/images.entity';
import { FloorPlan, FloorPlanDocument, FloorPlanSchema } from '../properties-management/floor-plan/floor-plan.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Property.name, schema: PropertySchema},
      {name: User.name, schema: UserSchema},
      {name: AmenityCategories.name, schema: AmenityCategoriesSchema},
      {name: PropertyCategories.name, schema: PropertyCategoriesSchema},
      {name: Countries.name, schema: CountriesSchema},
      {name: States.name, schema: StatesSchema},
      {name: Cities.name, schema: CitiesSchema},
      {name: Amenities.name, schema: AmenitiesSchema},
      {name: Images.name, schema: ImagesSchema},
      {name: FloorPlan.name, schema: FloorPlanSchema}
    ]),
  ],
  controllers: [ImportDataController],
  providers: [ImportDataService],
})
export class ImportDataModule {}
