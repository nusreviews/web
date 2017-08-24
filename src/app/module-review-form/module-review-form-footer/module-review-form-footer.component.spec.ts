import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleReviewFormFooterComponent } from './module-review-form-footer.component';

describe('ModuleReviewFormFooterComponent', () => {
  let component: ModuleReviewFormFooterComponent;
  let fixture: ComponentFixture<ModuleReviewFormFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleReviewFormFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleReviewFormFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
