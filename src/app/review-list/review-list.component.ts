import { Component, OnInit, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Review } from '../review';
import { ReviewsService } from '../reviews.service';
import { Router } from '@angular/router';

const pageSize = 20;

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews: Review[] = null;
  searchItem: string = "";
  userId: number = null; // null for now. Should use api to retrieve 

  @Input() moduleId: string;
  
  public loading: boolean = true;
  private page: number = 0;

  constructor(
    private reviewsService: ReviewsService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.reviewsService.getReviews(this.moduleId, this.userId, this.page * pageSize, pageSize)
      .then(reviews => this.reviews = reviews);
  }

  // ngAfterViewInit(): void {
  //   const tree = this.router.parseUrl(this.router.url);
  //   if (tree.fragment) {
  //     const frag = tree.fragment;
  //     const element = document.getElementById(frag);
  //     console.log(element);
  //     // Cant seem to find element
  //   }
  // }

}
