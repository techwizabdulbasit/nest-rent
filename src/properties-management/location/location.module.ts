import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Countries, CountriesSchema, States, StatesSchema, Cities, CitiesSchema } from './location.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
    { name: Countries.name, schema: CountriesSchema }, 
    { name: States.name, schema: StatesSchema }, 
    { name: Cities.name, schema: CitiesSchema }
  ])
],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}





