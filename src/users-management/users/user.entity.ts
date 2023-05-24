import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { Date, Document, Types } from 'mongoose';

import { Property } from "../../properties-management/properties/properties.entity";
import { Countries, States,  Cities } from "../../properties-management/location/location.entity";
import { IsEmail,} from 'class-validator';
import { IsDate, IsEnum, IsPhoneNumber } from '@nestjs/class-validator';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;
  
  @Prop({ required: true, unique: true,  })
  @IsEmail()
  email: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ required: false })
  @IsPhoneNumber('US')
  phone: Number;

  @Prop({required: true, enum: ['admin', 'landlord', 'tenent'] })
  // @IsEnum({enum: ['admin', 'landlord', 'tenent'] })
  user_type: string;

  @Prop({ default: true })
  is_active: boolean;

  // fields for analytics 
  // no of properties posted

  //references

  @Prop({ type: Types.ObjectId, ref: 'Countries', required: true  })
  country_id: Countries;
  
  @Prop({ type: Types.ObjectId, ref: 'States', required: true  })
  state_id: States;

  @Prop({ type: Types.ObjectId, ref: 'Cities', required: true  })
  city_id: Cities;

  @Prop({ default: [] })
  properties_id: Array<{
      type: Types.ObjectId,
      ref: Property
  }>;

  @Prop({ default: [] })
  favourite_properties_id: Array<{
      type: Types.ObjectId,
      ref: Property
  }>;

  @IsDate()
  @Prop({required: true, type: Date})
  created_at: Date

  @IsDate()
  @Prop({type: Date})
  updated_at: Date
  
}

export const UserSchema = SchemaFactory.createForClass(User);
