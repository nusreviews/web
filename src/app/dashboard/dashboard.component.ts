import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from '../module';
import { ModuleService } from '../module.service';
import { LoginService } from '../login.service';
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
  public loginService;

  constructor(
    private moduleService: ModuleService,
    private router: Router,
    loginService: LoginService
  ) { 
    this.loginService = loginService;
  }

  ngOnInit(): void {
    this.moduleService.getModulesSlowly()
      .then(modules => this.modules = modules);

    (<any>window).dashboard = this;
  }

  onSelect(module: Module): void {
    this.router.navigate(['/moduledetail', module.id]);
    this.selectedModule = module;
  }
}