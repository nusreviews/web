import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from '../module';
import { ModuleService } from '../module.service';
import { ModuleCardComponent } from '../module-card/module-card.component';

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

  constructor(
    private moduleService: ModuleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.moduleService.getModulesSlowly()
      .then(modules => this.modules = modules);
  }

  onSelect(module: Module): void {
    this.router.navigate(['/moduledetail', module.id]);
    this.selectedModule = module;
  }
}