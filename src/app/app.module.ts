import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { StarRatingModule } from 'angular-star-rating';
import { MaterializeModule } from 'ng2-materialize';
import { FacebookModule } from 'ngx-facebook';

import { ModuleService } from './module.service';
import { ReviewsService } from './reviews.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ModuleCardComponent } from './module-card/module-card.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { AboutComponent } from './about/about.component';
import { ModuleDetailComponent } from './module-detail/module-detail.component';

import { ReviewListItemComponent } from './review-list-item/review-list-item.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { ModuleReviewFormComponent } from './module-review-form/module-review-form.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { TermsOfServicePageComponent } from './terms-of-service-page/terms-of-service-page.component';
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ModuleCardComponent,
    HeaderBarComponent,
    AboutComponent,
    ModuleDetailComponent,
    ReviewListItemComponent,
    ReviewListComponent,
    ModuleReviewFormComponent,
    PrivacyPageComponent,
    TermsOfServicePageComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StarRatingModule.forRoot(),
    MaterializeModule.forRoot(),
    FacebookModule.forRoot()
  ],
  providers: [
    ModuleService,
    ReviewsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
