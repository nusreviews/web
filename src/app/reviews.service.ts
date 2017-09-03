import { Injectable } from '@angular/core';
import { Review } from './review';
import { REVIEWS } from './mock-reviews';

@Injectable()
export class ReviewsService {

  constructor() { }

  getReviews(): Promise<Review[]> {
    return Promise.resolve(REVIEWS);
  }
  getReviewsSlowly(): Promise<Review[]> {
    return new Promise(resolve => {
      // Simulate server latency with 1 second delay
      setTimeout(() => resolve(this.getReviews()), 1000);
    });
  }
  getReviewById(id: number): Promise<Review> {
      return this.getReviews().then(Reviews => Reviews.find(Review => Review.id === id));
  }
  getReviewsByUserId(userId: string): Promise<Review[]> {
    return this.getReviews().then(reviews => reviews.filter(review => review.userId === userId));
  }
  
}

