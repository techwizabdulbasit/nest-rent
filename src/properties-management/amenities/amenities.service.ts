import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amenities, AmenitiesDocument } from './amenities.entity';

@Injectable()
export class AmenitiesService {

    constructor(
        @InjectModel(Amenities.name) private AmenitiesModel: Model<AmenitiesDocument>,
    ) {}

    async getAllAmenities(){
        const Amenities = await this.AmenitiesModel.find().exec();
        return Amenities;
    }

    async createAmenity(amenity: Amenities){
        const createAmenity = new this.AmenitiesModel(amenity);
        return createAmenity.save();
    }
}
