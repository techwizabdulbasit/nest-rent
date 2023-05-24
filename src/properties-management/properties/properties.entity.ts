import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

import { Amenities } from '../amenities/amenities.entity';
import { AmenityCategories } from '../amenity-categories/amenity-categories.entity';
import { PropertyCategories } from '../property-categories/property-categories.entity';
import { Countries, States, Cities } from '../location/location.entity';
import { User } from '../../users-management/users/user.entity';
import { Reviews } from '../reviews/reviews.entity';
import { IsDate, IsLatitude, IsLongitude } from '@nestjs/class-validator';
import { FloorPlan } from '../floor-plan/floor-plan.entity';
import { Images } from '../images/images.entity';


export type PropertyDocument = Property & Document;

@Schema()
export class Property {
  @Prop({ required: true, unique: false })
  name: string;

  @Prop({ required: true })
  // @IsLatitude()
  latitude: number;

  @Prop({ type: Number, required: true })
  // @IsLongitude()
  longitude: number;

  @Prop({ required: true, minlength: 8 })
  address: string;

  @Prop()
  description: string;

  // flags
  // @Prop({ default: false })
  // favourite: boolean;
  @Prop({ default: 'no' })
  feature: String;
  @Prop({ default: 'active' })
  status : String;

  // references

  @Prop({ type: Types.ObjectId, ref: 'PropertyCategories', required: true })
  property_category_id: PropertyCategories;

  //   @Prop({ default: [] })
  //   amenities_id: [{
  //       type: Types.ObjectId,
  //       ref: Amenities
  //   }];

  @Prop({ type: Types.ObjectId, ref: 'Amenities', required: true })
  amenities_id: [Amenities];

  // amenities_id: [{ type: Types.ObjectId, ref: 'Amenities' }]

  @Prop({ type: Types.ObjectId, ref: 'Countries', required: true })
  country_id: Countries;

  @Prop({ type: Types.ObjectId, ref: 'States', required: true })
  state_id: States;

  @Prop({ type: Types.ObjectId, ref: 'Cities', required: true })
  city_id: Cities;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: User;

  // @Prop({ type: Types.ObjectId, ref: 'Images', required: false  })
  // images_id: [Images];

  // @Prop({ type: Types.ObjectId, ref: 'Reviews', required: false  })
  // reviews_id: [Reviews];

  @IsDate()
  @Prop({required: true, type: Date})
  created_at: Date

  @IsDate()
  @Prop({type: Date})
  updated_at: Date



  // @Prop({ type: Types.ObjectId, ref: 'FloorPlan', required: false  })
  // FloorPlan: [FloorPlan];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'FloorPlan' }], required: false })
  floorplans: [FloorPlan];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Images' }], required: false })
  images: [Images];


}

export const PropertySchema = SchemaFactory.createForClass(Property);
