import { Component, OnInit } from '@angular/core';
import { Review } from '../review';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews: Review[] = null;
  searchItem: string = "";

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this.reviewsService.getReviewsSlowly()
      .then(reviews => this.reviews = reviews);
  }

}
