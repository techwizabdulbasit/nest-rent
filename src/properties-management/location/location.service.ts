import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, STATES } from 'mongoose';
import { Countries, Cities, LocationDocument, States } from './location.entity';

@Injectable()
export class LocationService {

    constructor(
        @InjectModel('Countries') private CountriesModel: Model<LocationDocument>,
        @InjectModel('States') private StatesModel: Model<LocationDocument>,
        @InjectModel('Cities') private CitiesModel: Model<LocationDocument>,
    ) {}

    async getAllCountries(){
        const Countries = await this.CountriesModel.find().exec();
        return Countries;
    }

    async getAllStates(){
        const States = await this.StatesModel.find().exec();
        return States;
    }

    async getStatesByCountyQ(c: string, s: string){
        console.log('name', c , s)
        // const States = await this.StatesModel.find({c}).exec();
        // const States = await this.CountriesModel.findOne({c}).populate('States').exec();
        const Country = await this.CountriesModel.findOne({ name : c }).exec();
        let countryId = Country.id;
        // console.log('countryId', new mongoose.Types.ObjectId(countryId));
        const States = await this.StatesModel.find({}).where({country : new mongoose.Types.ObjectId(countryId)}).populate("cities", "" , Cities.name);//;.exec();
        // console.log('Country', Country)
        // console.log('States', States)
        return States;
        // let stateId:any = States;
        // const City = await this.CitiesModel.find({}).where({state : new mongoose.Types.ObjectId(stateId)}).exec();
        // console.log('City', City)
        // return City;
    }

    async getStatesByCountyP(n: string){
        // const Country = await this.CountriesModel.findOne({ name : n }).exec();
        // let countryId = Country.id;
        // const States = await this.StatesModel.find({}).where({country : new mongoose.Types.ObjectId(countryId) }).exec(); 
       
        // const States = await this.CountriesModel.findOne({n}).exec();
        // const States = await this.StatesModel.findOne({n}).populate('countries').exec();
        // const States = await this.CountriesModel.findOne({ name : n}, undefined, { populate: {path: 'states', options: {strictPopulate: false}}});
        
        const options = { 
            path: 'states', 
            // select: 'name email', 
            options: { strictPopulate: false } 
        };
      
        const allstates = await this.CountriesModel.findOne({ name : n})
        // .populate("states", "", States.name)
        // .populate({path: "states", populate: { path: 'cities'}});
        // .populate("cities", "" , Cities.name);
        // .populate(options).exec();
        .populate({path: "states", model: States.name, populate: {path: "cities", model: Cities.name}})
        
        return allstates;
    }
    
    async getAllCities(){
        const Cities = await this.CitiesModel.find().exec();
        return Cities;
    }
    
    // async addLocation(location: Location){
    //     const addLocation = new this.LocationModel(location);
    //     return addLocation.save();
    // }
}
