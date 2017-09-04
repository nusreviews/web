import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Review } from './review';
import { REVIEWS } from './mock-reviews';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReviewsService {
	
	constructor(private http: Http) { }
	
	// Retrieves list of reviews
	// If modId != null, returns a list of reviews for that module
	// If userId != null, returns a list of reviews, with information on whether
	// the input userId has liked the reviews or not.
	getReviews(modId: string, userId: number): Promise<Review[]> {
		let url = 'https://api.nusreviews.com/getReviews?';
		
		if (modId != null) {
			url = url + '&module=' + modId;
		}
		
		if (userId != null) {
			url = url + '&likedBy=' + userId;
		}

		console.log(url);

		return this.http.get(url)
        .toPromise()
        .then(response => {
            let jsonArray = response.json()["reviews"];
            let reviews = jsonArray.map(function(x) {
                let deserialisedReview = Review.deserialiseJson(x);
                return deserialisedReview;
            });
            console.log(reviews);
            return reviews;
        }) 
        .catch(this.handleError);
	}

	getReviewsSlowly(): Promise<Review[]> {
		return new Promise(resolve => {
			// Simulate server latency with 1 second delay
			setTimeout(() => resolve(this.getReviews('CS1020', null)), 1000);
		});
	}
	
	// getReviewById(id: string): Promise<Review> {
	// 	return this.getReviews(id, null).then(Reviews => Reviews.find(Review => Review.id === id));
	// }


	// Return list of reviews written by the input user
	getReviewsByUserId(userId: number): Promise<Review[]> {
		return this.http.get('https://api.nusreviews.com/getReviews?user=' + userId)
        .toPromise()
        .then(response => {
            let jsonArray = response.json()["reviews"];
            let reviews = jsonArray.map(function(x) {
                let deserialisedReview = Review.deserialiseJson(x);
                return deserialisedReview;
            });
            console.log(reviews);
            return reviews;
        }) 
        .catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
	
}

