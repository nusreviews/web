import { Component, OnInit, Input } from '@angular/core';
import { Module } from '../module';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { ModuleService } from '../module.service';
import { ModuleReviewFormComponent } from '../module-review-form/module-review-form.component';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css']
})
export class ModuleDetailComponent implements OnInit {
  @Input() module: Module;

  constructor(
    private moduleService: ModuleService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.moduleService.getModulesById(params.get('id'), true, 0, 1))
      .subscribe(modules => {
        if (modules.length > 0) {
          this.module = modules[0];
        } else {
          // Reroute out if module is not found
          this.router.navigate(['/404']);
        }
      });
  }
}

