import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors, Body, Get, Inject  } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream, readFileSync, mkdir, existsSync, mkdirSync } from 'fs';
import multer, { diskStorage } from 'multer';
import { Readable } from 'stream';
import { parse, unparse } from "papaparse";

import { ImportDataService } from "./import-data.service";

import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId, Types } from 'mongoose';
import { Property, PropertyDocument } from '../properties-management/properties/properties.entity';
import { AmenityCategories, AmenityCategoriesDocument } from '../properties-management/amenity-categories/amenity-categories.entity';
import { PropertyCategories, PropertyCategoriesDocument } from '../properties-management/property-categories/property-categories.entity';
import { Cities, Countries, States, LocationDocument } from '../properties-management/location/location.entity';
import { User, UserDocument } from '../users-management/users/user.entity';
import { Amenities, AmenitiesDocument } from '../properties-management/amenities/amenities.entity';
import { Images } from '../properties-management/images/images.entity';
import { Reviews } from '../properties-management/reviews/reviews.entity';

let dateNow = Date.now();

var iDir = './invalid-csv-data';

interface CSVData {
  name: string;
  latitude: number,
  longitude: number,
  address: string,
  description: string,
  favourite: string;
  premium: string;
  available: string;
  category: string
  country: string
  state: string
  city: string
  userEmail: string
  amenities: Array<string>,
}
interface CSVPropertyData {
  name: string,
  latitude: number,
  longitude: number,
  address: string,
  description: string,
  favourite: string,
  premium: string,
  available: string,
  property_category_id: ObjectId,
  amenity_category_id: ObjectId,
  country_id: ObjectId,
  state_id: ObjectId,
  city_id: ObjectId,
  user_id: ObjectId,
  amenities_id: [ObjectId],
  // images_id:  [Images],
  // reviews_id:  [Reviews],
}

@Controller('import-data')
export class ImportDataController {

  constructor(
    private readonly importDataService : ImportDataService,
    @InjectModel(Property.name)  private readonly propertyModel: Model<PropertyDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(AmenityCategories.name) public amenityCategoriesModel: Model<AmenityCategoriesDocument>,
    @InjectModel(PropertyCategories.name) public propertyCategoriesModel: Model<PropertyCategoriesDocument>,
    @InjectModel(Countries.name) public countryModel: Model<LocationDocument>,
    @InjectModel(States.name) public stateModel: Model<LocationDocument>,
    @InjectModel(Cities.name) public cityModel: Model<LocationDocument>,
    @InjectModel(Amenities.name) public amenityModel: Model<AmenitiesDocument>,
     ) {}


 
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename(req, file, cb) {
        cb(null, dateNow + file.originalname);
    },
    })
  }))
  async importCSV(@UploadedFile() file: Express.Multer.File, callback:() => void): Promise<any> {
    const csvFile = readFileSync(`uploads/${dateNow}${file.originalname}`);
    const stream = Readable.from(csvFile);
    const junkArray = [];
    const array = [];
    const floorplansArray = [];
    const imagesArray = [] ;
  
    return new Promise((resolve, reject) => {
      parse(stream, {
        header: true,
        worker: true,
        delimiter: ',',
        skipEmptyLines: true,
        transformHeader: (header) => header.toLowerCase().trim(),
        step: async (results:any, parser) => {
          parser.pause();

          let rawData = results.data        
          const { latitude, longitude, property_category, country, state, city, useremail, amenities, images, unit, minprice, maxprice, sqft, availabilitydate, mindeposit, maxdeposit } = results.data;

          let property_category_id;
          let amenity_category_id;
          let country_id;
          let state_id;
          let city_id
          let user_id; 
          let AmenitiesIdArray = [];
          let amenities_id;
          
          let imageArray = [];

          let floorplanArray = [];

          //  unit	minprice	maxprice	sqft	availabilitydate	mindeposit	maxdeposit
 
          const emptyColumns = Object.entries(rawData).filter(([key, value]) => !value);
          const existingUserDocument: any = await this.userModel.findOne({ email:{ $regex: new RegExp(`^${useremail}$`), $options: 'i' }},{},{ upsert: false }).exec()
      
          const attributes = ['unit', 'minprice', 'maxprice', 'sqft', 'availabilitydate', 'mindeposit', 'maxdeposit'];

const isSameLength = attributes.every(attr => rawData[attr]?.split('|').map(i => i.trim()).length === rawData[attributes[0]]?.split('|').map(i => i.trim()).length);
// console.log('isSameLength', isSameLength);

           if (emptyColumns.length > 0) {
            // If empty columns are found, add the row to the invalidRows array with the reason
            // junkArray.push({
            //   row: rawData,
            //   reason: `Empty columns: ${emptyColumns.map(([key]) => key).join(', ')}`,
            // });
            let junkObj = {
                ...rawData,
                reason: `Empty columns: ${emptyColumns.map(([key]) => key).join(', ')}`,
            }
            // console.log('junkObj', junkObj);
            junkArray.push(junkObj);
          }    
          else if (!isSameLength) {
            const junkObj = {
              ...rawData,
              reason: `Floor Plan does not have the same number of values for all attributes: ${attributes.join(', ')}`,
            };
            console.log('junkObj', junkObj);
            junkArray.push(junkObj);
          }
          else if (!existingUserDocument){
            // If are not found, add the row to the invalidRows array with the reason
            let junkObj = {
              ...rawData,
              reason: `User does not exist: ${useremail} `,
          }
          junkArray.push(junkObj);
          }
          else {

            // console.log('rawData', rawData);

            // If no empty columns, add the row to the validRows array, fetch ids if not found upsert
              if (existingUserDocument) {
                user_id = existingUserDocument._id;
              }
  
              // const existingAmenityCategoryDocument:any = await this.amenityCategoriesModel.findOne({ name: amenity_category })
              // if (!existingAmenityCategoryDocument) {
              //   // console.log('if !existingCategoryDocument');
              //   const createdCategoryDocument: any = await this.amenityCategoriesModel.create({ name: category })
              //   .then(() => {
              //     // console.log('createdCategoryDocument', createdCategoryDocument, category_id );
              //     category_id = createdCategoryDocument._id
              //   })
              // }else{
              //   category_id = existingAmenityCategoryDocument._id;
              //   // console.log('existingCategoryDocument', existingCategoryDocument, category_id );
              // }

              const existingPropertyCategoryDocument:any = await this.propertyCategoriesModel.findOne({ name: property_category })
              if (!existingPropertyCategoryDocument) {
                // console.log('if !existingPropertyCategoryDocument');
                const createdCategoryDocument: any = await this.propertyCategoriesModel.create({ name: property_category })
                .then(() => {
                  // console.log('createdCategoryDocument', createdCategoryDocument );
                  property_category_id = createdCategoryDocument._id
                })
              }else{
                property_category_id = existingPropertyCategoryDocument._id;
                // console.log('existingPropertyCategoryDocument', existingPropertyCategoryDocument, property_category_id );
              }

              // const existingPropertyCategoryDocument: any = await this.propertyCategoriesModel.findOneAndUpdate(
              //   { name: { $regex: new RegExp(`^${property_category}$`), $options: 'i' } },
              //   {},
              //   { upsert: true, new: true }
              // );
              // property_category_id = existingPropertyCategoryDocument._id;
          
              const existingCountryDocument: any = await this.countryModel.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${country}$`), $options: 'i' } },
                { name: country },
                { upsert: true, new: true }
              );
              country_id = existingCountryDocument._id;

              const existingStateDocument: any = await this.stateModel.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${state}$`), $options: 'i' } },
                { name: state, country: country_id },
                { upsert: true, new: true }
              );
              state_id = existingStateDocument._id;
              
              const existingCityDocument: any = await this.cityModel.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${city}$`), $options: 'i' } },
                { name: city, state: state_id },
                { upsert: true, new: true }
              );
              city_id = existingCityDocument._id;

              const AmenitiesArray = amenities.split('|').map((i: string) => i.trim());
              console.log('AmenitiesArray', AmenitiesArray);
              await Promise.all(
              AmenitiesArray.map(async (amen : string)  => {
                const existingAmenityDocument : any = await this.amenityModel.findOne({ name: { $regex: new RegExp(`^${amen}$`), $options: 'i' } })
                if (!existingAmenityDocument) {
                  // console.log('if (!existingAmenityDocument)');
                  const createdDocument: any = await this.amenityModel.create({name: amen, amenity_category_name: 'created_amenity_category_name' }).then(() => {
                    amenities_id = createdDocument._id
                    console.log('if (!existingAmenityDocument) createdDocument amenities_id',createdDocument,createdDocument._id, amenities_id);
                  })
                }else{
                  amenities_id = existingAmenityDocument._id;
                  console.log(' existingAmenityDocument amenities_id', amenities_id);
                }
                AmenitiesIdArray.push(amenities_id);
                console.log('AmenitiesIdArray', AmenitiesIdArray);
              })
              )

              imageArray = images.split('|').map((i: string) => i.trim());
              imagesArray.push(imageArray);
              // console.log('imageArray', imageArray);

              const unitArray = unit.split('|').map((i: string) => i.trim());
              const minPriceArray = minprice.split('|').map((i: string) => i.trim());
              const maxPriceArray = maxprice.split('|').map((i: string) => i.trim());
              const sqftArray = sqft.split('|').map((i: string) => i.trim());
              const availabilitydateArray = availabilitydate.split('|').map((i: string) => i.trim());
              const mindepositArray = mindeposit.split('|').map((i: string) => i.trim());
              const maxdepositArray = maxdeposit.split('|').map((i: string) => i.trim());
              // console.log('unitArray, minPriceArray, maxPriceArray', unitArray, minPriceArray, maxPriceArray);


                floorplanArray = unitArray.map((unit, index) => ({
                  unit,
                  min_price: minPriceArray[index],
                  max_price: maxPriceArray[index],
                  sq_ft: sqftArray[index],
                  availablity_date:availabilitydateArray[index],
                  min_deposit:mindepositArray[index],
                  max_deposit: maxdepositArray[index],
                  // property_id: null,
                }));

                floorplansArray.push(floorplanArray);
                // console.log('floorplanArray', floorplanArray);
     

                const rowsWithId = {
                ...results.data,  
                user_id: new Types.ObjectId(user_id),
                property_category_id: property_category_id,
                country_id: country_id,
                state_id: state_id,
                city_id: city_id,
                // amenities_id: [...AmenitiesIdArray], 
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
              };
        
              // array.push(rowsWithId);

              const data: CSVPropertyData = results.data as CSVPropertyData;
              const property = {
                name: data.name,
                favourite:data.favourite? data.favourite.toLowerCase() === 'true' : false,
                premium: data.premium ? data.premium.toLowerCase() === 'true' : false,
                available: data.available ? data.available.toLowerCase() === 'true' : false,
                latitude: rowsWithId.latitude,
                longitude: rowsWithId.longitude,
                address: data.address,
                description: data.description,
                property_category_id: rowsWithId.property_category_id,
                country_id: rowsWithId.country_id,
                state_id: rowsWithId.state_id,
                city_id: rowsWithId.city_id,
                user_id: rowsWithId.user_id,
                amenities_id: AmenitiesIdArray,
                created_at: Date.now(),
                // images_id: data.images_id,
                // reviews_id: data.reviews_id,
              };
          
              array.push(property);

          }
          // console.log('junkArray in step ', junkArray);
          // console.log('array in step ', array);           
          parser.resume();
        },
        error: async (error) =>{
          console.log('error in error ', error, error.message);
        },
        complete: async (results, file) => {
          console.log('junkArray in complete', junkArray);
          console.log('arrays in complete propertyArray, floorplansArray , imagesArray', array, floorplansArray , imagesArray);

          try {
              if (!existsSync(iDir)){
                mkdirSync(iDir);
              }               
              // Create a separate CSV file for invalid rows and Write the invalid CSV data to a file
              const invalidCsv = unparse( junkArray, { header: true });
              const invalidCsvStream = createWriteStream(`invalid-csv-data/${dateNow}-invalid-rows.csv`);
              invalidCsvStream.write(invalidCsv);
              invalidCsvStream.end();
              // return []
          } catch (error) {
            console.log('error Writing the invalid CSV data to a file', error);
          }

          try {
            const createProperty = await this.importDataService.createProperty(array, dateNow, imagesArray, floorplansArray);
            resolve(createProperty);
            // callback();
          } catch (error) {
            if (error.code === 11000) {
              console.log('error.code', error.code, error.message);
              reject(new Error('Duplicate key error occurred.'));
            } else {
              reject(error);
            }
          }

        },
      });
    });
  }
}
