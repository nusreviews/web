import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleReviewFormHeaderComponent } from './module-review-form-header.component';

describe('ModuleReviewFormHeaderComponent', () => {
  let component: ModuleReviewFormHeaderComponent;
  let fixture: ComponentFixture<ModuleReviewFormHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleReviewFormHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleReviewFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
