import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Property } from '../properties/properties.entity';

export type FloorPlanDocument = FloorPlan & Document;

@Schema()
export class FloorPlan {

  @Prop({ required: true})
  unit: Number ;

  @Prop({ type: Types.ObjectId, ref: 'Property', required: true  })
  property_id: Property;

  @Prop()
  min_price: Number ;

  @Prop()
  max_price: number ;
  
  @Prop()
  sq_ft: number ;

  @Prop()
  availablity_date: Date ;
  
  @Prop()
  min_deposit: number ;

  @Prop()
  max_deposit: number ;


}

export const FloorPlanSchema = SchemaFactory.createForClass(FloorPlan);
