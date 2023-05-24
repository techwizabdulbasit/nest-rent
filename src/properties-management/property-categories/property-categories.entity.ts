import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyCategoriesDocument = PropertyCategories & Document;

@Schema()
export class PropertyCategories {

  @Prop({ required: true, unique: true  })
  name: String ;

  // @Prop({ required: true, unique: true  })
  // p_id: Number ;

}

export const PropertyCategoriesSchema = SchemaFactory.createForClass(PropertyCategories);
