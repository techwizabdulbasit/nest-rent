// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Document, Types } from 'mongoose';

// import { Property } from "../../properties-management/properties/properties.entity";
// import { Countries, States,  Cities } from "../../properties-management/location/location.entity";
// import { Reviews } from 'src/properties-management/reviews/reviews.entity';
// import { IsEmail, IsNotEmpty, } from 'class-validator';

// export type UserDocument = User & Document;

// @Schema()
// export class User {

//   @Prop({ required: true })
//   firstName: string;

//   @Prop({ required: false })
//   lastName: string;

  
//   @Prop({ required: true, unique: true,  })
//   @IsEmail()
//   email: string;

//   @Prop({ required: true, minlength: 3 })
//   password: string;

//   @Prop({ required: false, minlength: 3 })
//   phone: Number;

//   @Prop({required: true, enum: ['admin', 'landlord', 'tenent'] })
//   userType: string;

//   @Prop({ default: true })
//   isActive: boolean;

//   // fields for analytics
//   // no of properties posted

//   //references

//   @Prop({ type: Types.ObjectId, ref: 'Countries', required: true  })
//   country_id: Countries;
  
//   @Prop({ type: Types.ObjectId, ref: 'States', required: true  })
//   state_id: States;

//   @Prop({ type: Types.ObjectId, ref: 'Cities', required: true  })
//   city_id: Cities;

//   @Prop({ default: [] })
//   properties_id: Array<{
//       type: Types.ObjectId,
//       ref: Property
//   }>;
  
// }

// export const UserSchema = SchemaFactory.createForClass(User);
