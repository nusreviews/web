import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { User } from '../user';
import { UserService } from '../user.service';
import { Review } from '../review';
import { ReviewsService } from '../reviews.service';

const pageSize = 10;

@Component({
  selector: 'user-summary',
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.css']
})
export class UserSummaryComponent implements OnInit {

  @Input() user: User;
  @Input() reviews: Review[];

  public loading: boolean = true;
  private page: number = 0;
  private canScroll = false;

  constructor(
    private userService: UserService,
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    // Waiting for user service apis

    // this.route.paramMap
    //   .switchMap((params: ParamMap) => this.userService.getUserById(+params.get('id')))
    //   .subscribe(user => {
    //     this.user = user;
    //     this.reviewsService.getReviewsByUserId(this.user.id, this.page * pageSize, pageSize)
    //       .then(reviews => this.reviews = reviews)
    //   });

    this.loading = true;
    // Temporal Placeholder
    this.user = new User();
    this.user.username = "Placeholder User Name";

    // Temporal Reviews Fetch
    this.route.paramMap
      .switchMap((params: ParamMap) => this.reviewsService.getReviewsByUserId(+params.get('id'), this.page * pageSize, pageSize))
      .subscribe(reviews => {
        this.reviews = reviews;
        this.loading = false;
        if (reviews.length == pageSize) {
          this.canScroll = true;
        }
      });
  }

  onScroll() {
    if (this.canScroll) {
      this.page += 1;
      this.loading = true;
      this.route.paramMap
      .switchMap((params: ParamMap) => this.reviewsService.getReviewsByUserId(+params.get('id'), this.page * pageSize, pageSize))
      .subscribe(reviews => {
        this.reviews = this.reviews.concat(reviews);
        this.loading = false;
        if (reviews.length == 0) {
          this.canScroll = false;
        }
      })
    }
  }
}
