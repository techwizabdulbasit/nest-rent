import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reviews, ReviewsSchema } from './reviews.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reviews.name, schema: ReviewsSchema }]),],
  controllers: [ReviewsController],
  providers: [ReviewsService]
})
export class ReviewsModule {}
