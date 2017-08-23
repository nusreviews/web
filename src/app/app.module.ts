import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ModuleService } from './module.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ModuleDetailComponent } from './module-detail/module-detail.component';

import { StarRatingModule } from 'angular-star-rating';
import { ReviewListItemComponent } from './review-list-item/review-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ModuleDetailComponent,
    ReviewListItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    StarRatingModule.forRoot()
  ],
  providers: [
    ModuleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
