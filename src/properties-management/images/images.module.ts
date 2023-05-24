import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Images, ImagesSchema } from './images.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Images.name, schema: ImagesSchema }]),],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}


