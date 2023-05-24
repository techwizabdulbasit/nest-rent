import { Controller, Post, Body, Get, Param, Delete, Put, Query, ParseEnumPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service'
import { Reviews } from './reviews.entity';

@Controller('reviews')
export class ReviewsController {

    constructor(private readonly reviewsService : ReviewsService ) {}

    @Get()
    async getAllReviewsByPropertyId(){
        const reviews = await this.reviewsService.getAllReviewsByPropertyId();
        return reviews;  
    }

    @Post()
    async addReview(@Body() review: Reviews) {
      const createReview = await this.reviewsService.createReview(review);
      return createReview;
    }
}
