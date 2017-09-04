import { Component, OnInit, Input } from '@angular/core';
import { Module } from '../module';
import { Review } from '../review';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { ModuleService } from '../module.service';
import { ReviewsService } from '../reviews.service';
import { LoginService } from '../login.service';
import { ModuleReviewFormComponent } from '../module-review-form/module-review-form.component';
import { Subscription } from 'rxjs';

const pageSize = 20;

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css']
})
export class ModuleDetailComponent implements OnInit {
  @Input() module: Module;
  @Input() reviews: Review[];
  public loading = true;
  private isLoggedInSubscription: Subscription;
  private page: number = 0;

  constructor(
    private moduleService: ModuleService,
    private loginService: LoginService,
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { 
    this.loginService = loginService;
    this.isLoggedInSubscription = this.loginService.getLoggedInObservable().subscribe(isLoggedIn => {
      //this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit(): void {
    // Check if user is already logged in
    if (this.loginService.getProfile()) {
      //this.isLoggedIn = true
    }

    // Fetch Module from url
    this.route.paramMap
      .switchMap((params: ParamMap) => this.moduleService.getModulesById(params.get('id'), true, 0, 1))
      .subscribe(modules => {
        if (modules.length > 0) {
          this.module = modules[0];
          console.log(this.module);
          if (this.loginService.getProfile()) {
            // If user is already logged in
            this.reviewsService.getReviews(this.module.code, this.loginService.getProfile().nusreviews.userId,
          this.page * pageSize, pageSize).then(reviews => {
            this.reviews = reviews;
            this.loading = false;
          })
          } else {
            // If user is not logged in yet
            this.reviewsService.getReviews(this.module.code, null, this.page * pageSize, pageSize).then(reviews => {
              this.reviews = reviews;
              this.loading = false;
            })
          }
        } else {
          // Reroute out if module is not found
          this.router.navigate(['/404']);
        }
      });
  }
}

