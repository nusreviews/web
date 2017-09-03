import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from '../module';
import { ModuleService } from '../module.service';
import { ModuleCardComponent } from '../module-card/module-card.component';

const pageSize = 20;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    '../../structure.css'
  ]
})

export class DashboardComponent implements OnInit {

  modules: Module[] = null;
  selectedModule: Module = null;
  page = 0;

  constructor(
    private moduleService: ModuleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    var offset = this.page * pageSize;
    this.moduleService.getModules(offset, pageSize)
      .then(modules => {
        this.modules = modules;
      });
  }

  onSelect(module: Module): void {
    this.router.navigate(['/moduledetail', module.id]);
    this.selectedModule = module;
  }

  submit(searchItem: string): void {
    console.log(searchItem);
  }

  onScroll(): void {
    this.page += 1;
    var offset = this.page * pageSize;
    this.moduleService.getModules(offset, pageSize)
      .then(modules => {
        this.modules = this.modules.concat(modules);
      });
  }
}