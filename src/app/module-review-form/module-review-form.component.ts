import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { LoginService } from '../login.service';
import { ReviewsService } from '../reviews.service';
import { MzModalService } from 'ng2-materialize';
import { FbLoginModalComponent } from '../fb-login-modal/fb-login-modal.component';
import { Router } from '@angular/router';
import { forEach } from 'lodash';

import { Module } from '../module';
import { Review } from '../review';

@Component({
  selector: 'module-review-form',
  templateUrl: './module-review-form.component.html',
  styleUrls: ['./module-review-form.component.css'],
})
export class ModuleReviewFormComponent implements OnInit {

  @ViewChild('staff_quality_rating') staffQualityRating;
  @ViewChild('module_difficulty_rating') moduleDifficultyRating;
  @ViewChild('module_enjoyability_rating') moduleEnjoyabilityRating;
  @ViewChild('module_workload_rating') moduleWorkloadRating;
  @ViewChild('comments') comments;

  @Input() module: Module;
  @Input() userReview: Review;

  public submitDisabled = true;
  public recommend: boolean = null;
  public loading: boolean = false;
  public changesDetected: boolean = false;

  constructor(
    private loginService: LoginService,
    private reviewsService: ReviewsService,
    private modalService: MzModalService,
    private router: Router,
  ) {}

  ngOnInit() {}

  onRatingChange(event) {
    // Check if form is ready
    if (this.checkFormIsReady()) {
      this.submitDisabled = false;
    }
  }

  onRatingChangeEdit(event) {
    if (!this.changesDetected) {
      this.changesDetected = true;
    }
  }

  onCommentsEdit() {
    if (!this.changesDetected) {
      this.changesDetected = true;
    }
  }

  setRecommend(recommend) {
    // Skip check if is for edit
    if (this.userReview) {
      this.recommend = recommend;
      if (!this.changesDetected) {
        this.changesDetected = true;
      }
      return;
    }

    this.recommend = recommend;
    if(this.checkFormIsReady()) {
      this.submitDisabled = false;
    }
  }

  checkFormIsReady(): boolean {
    var unfilledRatingNames = [];
    var ratingNamesToValue = {};
    forEach([this.staffQualityRating, this.moduleDifficultyRating, this.moduleEnjoyabilityRating, this.moduleWorkloadRating], 
      (rating, ratingName) => {
      // Skip non-rating keys
      //if (ratingName != "staffQualityRating" || ratingName != "moduleDifficultyRating"
      //   || ratingName != "moduleEnjoyabilityRating" || ratingName != "moduleWorkloadRating") {
      //  return;
      //}

      var ratingValue = rating.ratingAsInteger;
      if (ratingValue === 0) {
        unfilledRatingNames.push(ratingName);
      }
      ratingNamesToValue[ratingName] = ratingValue;
    });

    if (unfilledRatingNames.length > 0) {
      return false;
    }
    if (this.recommend == null) {
      return false;
    }
    
    return true;
  }

  onSubmit() {
    // Check for login to FB first
    if (!this.loginService.getProfile()) {
      this.modalService.open(FbLoginModalComponent);
      return;
    }

    // Check if form is ready
    if (this.checkFormIsReady()) {
      var newReview = {
        teaching: this.staffQualityRating.ratingAsInteger,
        difficulty: this.moduleDifficultyRating.ratingAsInteger,
        enjoyability: this.moduleEnjoyabilityRating.ratingAsInteger,
        workload: this.moduleWorkloadRating.ratingAsInteger,
        recommend: this.recommend,
        comments: this.comments.nativeElement.value,
        modId: this.module.id,
      };
      this.reviewsService.postNewReview(newReview);
      // Engage loading block
      this.loading = true;
    }
  }

  saveChanges() {
    // Check for login to FB first
    if (!this.loginService.getProfile()) {
      this.modalService.open(FbLoginModalComponent);
      return;
    }

    var editReview = {
      teaching: this.staffQualityRating.ratingAsInteger,
      difficulty: this.moduleDifficultyRating.ratingAsInteger,
      enjoyability: this.moduleEnjoyabilityRating.ratingAsInteger,
      workload: this.moduleWorkloadRating.ratingAsInteger,
      recommend: this.recommend,
      comments: this.comments.nativeElement.value,
      modId: this.module.id,
    };

    console.log(editReview);
    // this.reviewsService.postNewReview(editReview);
    // // Engage loading block
    // this.loading = true;
  }
}
