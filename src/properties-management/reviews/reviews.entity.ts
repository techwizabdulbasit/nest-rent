import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

import { Property } from "../properties/properties.entity";
import { User } from "../../users-management/users/user.entity";
import { IsDate } from '@nestjs/class-validator';

export type ReviewsDocument = Reviews & Document;


@Schema()
export class Reviews {

  @Prop({ required: true, minlength: 3})
  review: String;

  @Prop({ required: true, min: 1, max: 5})
  rating: Number;
  
  @Prop({ required: true})
  @IsDate()
  created_at: Date;
  
  @Prop({ type: Types.ObjectId, ref: 'User', required: true  })
  user_id: User;
  
  @Prop({ type: Types.ObjectId, ref: 'Property', required: true  })
  property_id: Property;
}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);

