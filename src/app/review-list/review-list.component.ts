import { Component, OnInit } from '@angular/core';
import { Review } from '../review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews: Review[] = null;
  searchItem: string = "";

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.reviewService.getReviewsSlowly()
      .then(reviews => this.reviews = reviews);
  }

}
