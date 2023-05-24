import { Injectable } from '@nestjs/common';
// import { CsvParser } from 'nest-csv-parser';
import * as fs from 'fs' ;
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from '../properties-management/properties/properties.entity';
import { User, UserDocument } from '../users-management/users/user.entity';
import { Images, ImagesDocument } from '../properties-management/images/images.entity';
import { FloorPlan, FloorPlanDocument } from '../properties-management/floor-plan/floor-plan.entity';
import path from 'path';


@Injectable()
export class ImportDataService {
    constructor( 
        @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Images.name) private imagesModel: Model<ImagesDocument>,
        @InjectModel(FloorPlan.name) private floorPlanModel: Model<FloorPlanDocument>,
    ) {}



    async createProperty(properties: any, dateNow: any, imagesArray: any, floorplansArray: any){
        // console.log('property in service', properties, imagesArray, floorplansArray);

        const createProperty = await this.propertyModel.insertMany(properties)

        // const filepath = path.join(__dirname,'csv',);
        // console.log('filepath', filepath);
		const downloadFile = await new Promise<Buffer>((resolve, reject) => {
			fs.readFile(`invalid-csv-data/${dateNow}-invalid-rows.csv`, {}, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});



        for(let i = 0 ; i < createProperty.length; i++){
            let pId = createProperty[i]._id;
            imagesArray[i].map(async (img) => {
                 const images = {
                    reference_id: pId,
                    title : "imported image",
                    uri:img,
                    reference_model_type: 'Property'
                    }
                const createdImage = await this.imagesModel.create(images);
            }) 

            floorplansArray[i].map(async (fp) => {
                // console.log('fp', fp); 
                const floorPlan = {
                    ...fp,
                    property_id: pId
                   }
                //    console.log('floorPlan', floorPlan);
                const createdFloorPlan = await this.floorPlanModel.create(floorPlan);
           }) 
        }


        //  get property id > insert floor plan and image here

        // delete files

		return ["created Property, created Floor Plan and inserted Images ",createProperty , downloadFile] ;

    }




}
