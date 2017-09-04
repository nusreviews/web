import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../review';

@Component({
  selector: 'like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent implements OnInit {

  isActive: boolean;
  iconName: string;
  numLikes: number;

  @Input() review: Review;

  constructor() { }

  ngOnInit() {
    this.numLikes = this.review.numLikes;
    this.isActive = this.review.hasUserLiked;
    if (this.isActive) {
      this.iconName = 'favorite';
    } else {
      this.iconName = 'favorite_border';
    }
  }

  onClick(): void {
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.iconName = "favorite"; 
      this.numLikes++;
      // api call

    } else {
      this.iconName = "favorite_border";
      this.numLikes--;
      // api call
    }

  }

}
