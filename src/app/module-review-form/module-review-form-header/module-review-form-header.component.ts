import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'module-review-form-header',
  templateUrl: './module-review-form-header.component.html',
  styleUrls: ['./module-review-form-header.component.css']
})
export class ModuleReviewFormHeaderComponent implements OnInit {

  public moduleCode: String;

  constructor() { 
    this.moduleCode = "CS3216: Software Product Engineering for Digital Markets";
  }

  ngOnInit() {
  }

}
