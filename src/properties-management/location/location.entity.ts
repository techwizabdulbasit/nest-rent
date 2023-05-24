import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type LocationDocument = Countries & States & Cities & Document;

@Schema()
export class Countries {
  
  @Prop({ required: false, unique : true })
  country_id: Number ;

  @Prop({ required: false })
  shortname: String ;

  @Prop({ required: true })
  name: String ;

  // @Prop({ default: [] })
  // states: Array<{
  //     type: Types.ObjectId,
  //     ref: States,
  //     // cities: Array<{
  //     //     type: Types.ObjectId,
  //     //     ref: Cities
  //     // }>;
  // }>

  @Prop({ type: Types.ObjectId, ref: 'States', required: false  })
  states_id: [States];

  
  // @Prop({ default: [] })
  // cities: Array<{
  //     type: Types.ObjectId,
  //     ref: Cities
  // }>;

  @Prop({ type: Types.ObjectId, ref: 'Cities', required: false  })
  cities_id: [Cities];

}

@Schema()
export class States {

  @Prop({ required: false, unique : true })
  state_id: Number ;

  @Prop({ required: true })
  name: String ;

  // @Prop({ required: true })
  // country: Types.ObjectId
  // {
  //     type: ,
  //     ref: Countries
  // };

  @Prop({ type: Types.ObjectId, ref: 'Countries', required: false  })
  country_id: Countries;
  

  // @Prop({ default: [] })
  // cities: Array<{
  //     type: Types.ObjectId,
  //     ref: Cities
  // }>;

  @Prop({ type: Types.ObjectId, ref: 'Cities', required: false  })
  cities_id: [Cities];

}

@Schema()
export class Cities {

  // @Prop({ required: true, unique : true })
  // state_id: Number ;

  @Prop({ required: true })
  name: String ;

  // @Prop({ required: true })
  // state: {
  //     type: Types.ObjectId,
  //     ref: States
  // };

  @Prop({ type: Types.ObjectId, ref: 'States', required: false })
  state: States;
  
}

export const CountriesSchema = SchemaFactory.createForClass(Countries);
export const StatesSchema = SchemaFactory.createForClass(States);
export const CitiesSchema = SchemaFactory.createForClass(Cities);