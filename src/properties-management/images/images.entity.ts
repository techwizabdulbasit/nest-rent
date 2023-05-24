import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

import { Property } from "../properties/properties.entity";
import { FloorPlan } from "../floor-plan/floor-plan.entity";
// import { IsEnum } from '@nestjs/class-validator';

export type ImagesDocument = Images & Document;

enum ImageReferenceType {
  Property = 'Property',
  FloorPlan = 'FloorPlan',
}


@Schema()
export class Images {

  @Prop({ required: false  })
  title: String;

  @Prop({ required: true })
  uri: String;

  // @Prop({ type: Types.ObjectId, ref: 'Property', required: true  })
  // reference_id: [Property, FloorPlan];

  
  @Prop({ type: Types.ObjectId, required: true  })
  reference_id: Types.ObjectId;

  @Prop({ required: true, enum: ImageReferenceType })
  reference_model_type: ImageReferenceType;

  // @IsEnum({Property, FloorPlan})
  // @Prop({ required: true })
  // type: String;

}

export const ImagesSchema = SchemaFactory.createForClass(Images);

