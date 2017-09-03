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

  searchItem = '';
  modules: Module[] = null;
  selectedModule: Module = null;
  page = 0;
  canScroll = true;
  searchInvoked = false;

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

  // Commit a search
  submit(searchItem: string): void {
    if (searchItem.trim().toUpperCase().length > 0) {
      this.searchItem = searchItem;
      this.page = 0;
      this.canScroll = true;
    } else {
      this.searchItem = "";
      this.searchInvoked = false;
      return
    }
    this.moduleService.getModulesById(this.searchItem, false, 0, pageSize)
    .then(modules => {
      this.modules = modules;
    })
    this.searchInvoked = true;
  }

  clearSearch(): void {
    this.searchItem = "";
    this.canScroll = true;
    this.page = 0;
    this.searchInvoked = false;
    var offset = this.page * pageSize;
    this.moduleService.getModules(offset, pageSize)
      .then(modules => {
        this.modules = modules;
      });
  }

  onScroll(): void {
    if (this.canScroll) {
      this.page += 1;
      var offset = this.page * pageSize;
      if (this.searchItem.length > 0) {
        this.moduleService.getModulesById(this.searchItem, false, offset, pageSize)
          .then(modules => {
            if (modules.length > 0) {
              this.modules = this.modules.concat(modules);
            } else {
              this.canScroll = false;
            }
          })
      } else {
        this.moduleService.getModules(offset, pageSize)
          .then(modules => {
            if (modules.length > 0) {
              this.modules = this.modules.concat(modules);
            } else {
              this.canScroll = false;
            }
          });
      }
    }
  }
}