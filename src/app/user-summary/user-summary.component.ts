import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { User } from '../user';
import { UserService } from '../user.service';
import { Review } from '../review';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'user-summary',
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.css']
})
export class UserSummaryComponent implements OnInit {

  @Input() user: User;
  @Input() reviews: Review[];

  public loading: boolean = true;

  constructor(
    private userService: UserService,
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.userService.getUserById(+params.get('id')))
      .subscribe(user => {
        this.user = user;
        this.reviewsService.getReviewsByUserId(this.user.id)
          .then(reviews => this.reviews = reviews)
      });
    
  }

}
