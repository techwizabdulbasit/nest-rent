import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BedsBathsDocument = Beds & Baths & Document;

@Schema()
export class Beds {

  @Prop({ required: true})
  no_of_beds: Number ;
  
}

@Schema()
export class Baths {

  @Prop({ required: true})
  no_of_baths: Number ;

}

export const BedsSchema = SchemaFactory.createForClass(Beds);
export const BathsSchema = SchemaFactory.createForClass(Baths);