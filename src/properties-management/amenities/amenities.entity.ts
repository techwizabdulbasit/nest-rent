import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AmenityCategories } from '../amenity-categories/amenity-categories.entity';

export type AmenitiesDocument = Amenities & Document;

@Schema()
export class Amenities {

  @Prop({ required: true, unique: true  })
  name: String ;

  // @Prop({ required: true, unique: true  })
  // type_id: Number ;

  @Prop({ type: Types.ObjectId, ref: 'AmenityCategories', required: false  })
  amenity_category_id: AmenityCategories;

  @Prop({ required: true, unique: true  })
  amenity_category_name: String ;


}

export const AmenitiesSchema = SchemaFactory.createForClass(Amenities);
