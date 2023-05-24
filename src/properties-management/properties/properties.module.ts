import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertyDocument, PropertySchema } from './properties.entity';
import { FloorPlan, FloorPlanDocument,FloorPlanSchema } from '../floor-plan/floor-plan.entity';
import { Images, ImagesDocument, ImagesSchema } from '../images/images.entity';



@Module({
  imports: [MongooseModule.forFeature([
    { name: Property.name, schema: PropertySchema },
    { name: FloorPlan.name, schema: FloorPlanSchema },
    { name: Images.name, schema: ImagesSchema },
  ])],
  controllers: [PropertiesController],
  providers: [PropertiesService]
})
export class PropertiesModule {}
