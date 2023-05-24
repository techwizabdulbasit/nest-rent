import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from './properties.entity';
import { FloorPlan, FloorPlanDocument } from '../floor-plan/floor-plan.entity';
import { Images, ImagesDocument } from '../images/images.entity';


@Injectable()
export class PropertiesService {

    constructor(
        @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
        @InjectModel('FloorPlan') private floorPlanModel: Model<FloorPlanDocument>,
        @InjectModel('Images') private imagesModel: Model<ImagesDocument>,
        ) {}

      async getProperties(){
        const properties = await this.propertyModel.find().exec();
        return properties;
    }
    
    async getAllProperties(){
        // const properties = await this.propertyModel.find().populate(FloorPlan.name).populate(Images.name);
        // const properties = await this.propertyModel.find({ path: FloorPlan.name, strictPopulate: false });
        // const properties = await this.propertyModel.find()
        const properties = await this.propertyModel.aggregate([
            {
              $lookup: {
                from: "floorplans",
                localField: "_id",
                foreignField: "property_id",
                as: "floorplans"
              }
            },
            {
                $lookup: {
                  from: "images",
                  localField: "_id",
                  foreignField: "reference_id",
                  as: "images"
                }
            }
          ])
        //  .populate('floorplans')
        // .populate({path:'floorplans', model: FloorPlan.name})
        // .populate({ path: 'floorplans', model: this.floorPlanModel,  localField: 'property_id'})
        // .populate({path: "images", model: this.imagesModel})

        // .populate({path: "floorplans", model: 'FloorPlan'})

        // foreignField: 'property_id', match: 'property_id',
        // .populate({path: FloorPlan.name , model: FloorPlan.name})
        // const properties = await this.propertyModel.find().populate('floorplans');
        return properties;
    }
    // populate: {path: Images.name, model: Images.name}

    async findPropertyByName(name: string): Promise<Property | null> {
        const property = this.propertyModel.findOne({ 'name': { $regex: new RegExp(`^${name}$`), $options: 'i' }  }).exec();
        return property;
     }

    async findPropertyById(id: string): Promise<Property | null> {
        const property = await this.propertyModel.findById(id);
        return property;
    }
 
    async createProperty(property: Property){
        const createProperty = new this.propertyModel(property);
        return createProperty.save();
    }

    async updateProperty(id: string, property: Property): Promise<Property | null> {
        const updatedProperty = await this.propertyModel.findByIdAndUpdate(id, property, { new: true });
        return updatedProperty;
    }
    
    async deleteProperty(id: string): Promise<Property | any> {
        const deletedProperty = await this.propertyModel.findByIdAndDelete(id);
        return ['Property '+ deletedProperty.name + ' Deleted Successfully'];
    }


}

