import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'module-review-form-footer',
  templateUrl: './module-review-form-footer.component.html',
  styleUrls: ['./module-review-form-footer.component.css']
})
export class ModuleReviewFormFooterComponent implements OnInit {

  @Output() onSubmit = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  submitForm() { 
    this.onSubmit.emit();
  }

}
