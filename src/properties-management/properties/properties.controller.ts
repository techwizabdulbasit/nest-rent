import { Controller, Post, Body, Get, Param, Delete, Put, Query, ParseEnumPipe } from '@nestjs/common';
import { PropertiesService } from './properties.service'
import { Property } from './properties.entity';
import { Amenities } from '../amenities/amenities.entity';

@Controller('properties')
export class PropertiesController {

    constructor(private readonly propertiesService : PropertiesService ) {}

    @Get()
    async getProperties(){
        const property = await this.propertiesService.getProperties();
        return property;  
    }

    @Get('all')
    async getAllProperties(){
        const property = await this.propertiesService.getAllProperties();
        return property;  
    }

    // @Get('')
    // async getPaginatedProperties(){
    //     const property = await this.propertiesService.getPaginatedProperties();
    //     return property;  
    // }

    @Get('find')
    async findPropertyByName(@Query('name') name: string){
      const property = await this.propertiesService.findPropertyByName(name);
      return property;
    }

    @Get(':id')
    async findPropertyById(@Param('id') id: string){
      const property = await this.propertiesService.findPropertyById(id);
      return property;
    }

    @Post()
    async createProperty(@Body() property: Property) {
      const createProperty = await this.propertiesService.createProperty(property);
      return createProperty;
    }
  
    @Put(':id')
    async updateProperty(@Param('id') id :string, @Body() property: Property){
      const updatedProperty = await this.propertiesService.updateProperty(id, property);
      return updatedProperty;
    }
  
    @Delete(':id')
    async deleteProperty(@Param('id') id :string){
        const deletedProperty = await this.propertiesService.deleteProperty(id);
        return deletedProperty;
    }
  
}
