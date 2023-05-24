import { Controller, Post, Body, Get, Param, Delete, Put, Query, ParseEnumPipe } from '@nestjs/common';
import { LocationService } from './location.service'

@Controller('location')
export class LocationController {

    constructor(private readonly locationService : LocationService ) {}

    @Get('countries')
    async getAllLocation(){
        const country = await this.locationService.getAllCountries();
        return country;  
    }

    @Get('states')
    async getAllStates(){
        const state = await this.locationService.getAllStates();
        return state;  
    }

    @Get('country/states')
    async getUserDetailsQ(@Query('countryName') c :string , @Query('stateName') s :string){
        console.log("c cont", c, s);
        const userDetails = await this.locationService.getStatesByCountyQ(c,s);
        return userDetails;
    }

    @Get(':name')
    async getUserDetailsP(@Param('name') name :string){
        const userDetails = await this.locationService.getStatesByCountyP(name);
        return userDetails;
    }

    @Get('cities')
    async getAllCities(){
        const city = await this.locationService.getAllCities();
        return city;  
    }

    // @Post()
    // async addLocation(@Body() location: Location) {
    //   const createLocation = await this.locationService.addLocation(location);
    //   return createLocation;
    // }
}
