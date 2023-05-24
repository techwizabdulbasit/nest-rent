import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reviews, ReviewsDocument } from './reviews.entity';

@Injectable()
export class ReviewsService {

    constructor(
        @InjectModel(Reviews.name) private ReviewsModel: Model<ReviewsDocument>,
    ) {}

    async getAllReviewsByPropertyId(){
        const reviews = await this.ReviewsModel.find().exec();
        return reviews;
    }

    async createReview(review: Reviews){
        const createReview = new this.ReviewsModel(review);
        return createReview.save();
    }
}
