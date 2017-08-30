import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent implements OnInit {

  isActive: boolean = false;
  iconName: string = "favorite_border";
  numLikes: number = 0;

  constructor() { }

  ngOnInit() {
  }

  onClick(): void {
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.iconName = "favorite"; 
      this.numLikes++;
    } else {
      this.iconName = "favorite_border";
      this.numLikes--;
    }

  }

}
