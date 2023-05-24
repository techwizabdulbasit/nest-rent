import { Controller, Post, Body, Get, Param, Delete, Put, Query, ParseEnumPipe } from '@nestjs/common';
import { AmenitiesService } from './amenities.service'
import { Amenities } from './amenities.entity';

@Controller('amenities')
export class AmenitiesController {

    constructor(private readonly amenitiesService : AmenitiesService ) {}

    @Get()
    async getAllAmenities(){
        const amenities = await this.amenitiesService.getAllAmenities();
        return amenities;  
    }

    @Post()
    async addAmenity(@Body() amenity: Amenities) {
      const createAmenity = await this.amenitiesService.createAmenity(amenity);
      return createAmenity;
    }
}
