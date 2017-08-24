import { Component, OnInit, Input } from '@angular/core';
import { Module } from '../module';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-module-card',
  templateUrl: './module-card.component.html',
  styleUrls: [
    './module-card.component.css',
    '../../structure.css',
    ]
})
export class ModuleCardComponent implements OnInit {

  @Input()
  module: Module = null;

  constructor(private moduleService: ModuleService) { }

  ngOnInit() {

  }

  loadModuleByCode(code: string) {
    this.moduleService.getModuleByCode(code)
    .then(mod => this.module = mod);
  }

}
