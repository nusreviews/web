import { Component, OnInit } from '@angular/core';
import { Module } from '../module';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  modules: Module[] = null;
  searchItem: string = "";

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.moduleService.getModulesSlowly()
      .then(modules => this.modules = modules);
  }
}
