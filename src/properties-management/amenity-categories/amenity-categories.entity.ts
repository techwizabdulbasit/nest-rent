import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AmenityCategoriesDocument = AmenityCategories & Document;

@Schema()
export class AmenityCategories {

  @Prop({ required: true, unique: true  })
  name: String ;

  // @Prop({ required: true, unique: true  })
  // f_id: Number ;

}

export const AmenityCategoriesSchema = SchemaFactory.createForClass(AmenityCategories);
