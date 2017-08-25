import { Component, OnInit, ViewChild } from '@angular/core';
import { forEach } from 'lodash';

@Component({
  selector: 'module-review-form',
  templateUrl: './module-review-form.component.html',
  styleUrls: ['./module-review-form.component.css']
})
export class ModuleReviewFormComponent implements OnInit {

  @ViewChild('staff_quality_rating') staffQualityRating;
  @ViewChild('module_difficulty_rating') moduleDifficultyRating;
  @ViewChild('module_enjoyability_rating') moduleEnjoyabilityRating;
  @ViewChild('overall_rating') overallRating;
  @ViewChild('comments') comments;

  public moduleCode = "CS3216: Software Product Engineering for Digital Markets";

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    var unfilledRatingNames = [];
    var ratingNamesToValue = {};
    forEach(this, (rating, ratingName) => {
      // Skip non-rating keys
      if (ratingName === "comments") {
        return;
      }

      var ratingValue = rating.ratingAsInteger;
      if (ratingValue === 0) {
        unfilledRatingNames.push(ratingName);
      }
      ratingNamesToValue[ratingName] = ratingValue;
    });

    var alertMessage = "";
    if (unfilledRatingNames.length > 0) {
      alertMessage = 
        "Please fill up the following ratings: \n" + 
        unfilledRatingNames.join("\n");
    } else {
      alertMessage = 
        "Success! Your ratings are: \n" + 
        JSON.stringify(ratingNamesToValue) + "\n" +
        "Comments: " + this.comments.nativeElement.value;
    }
    alert(alertMessage);
  }

}
