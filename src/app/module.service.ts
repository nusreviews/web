import { Injectable } from '@angular/core';
import { Module } from './module';
import { MODULES } from './mock-modules';

@Injectable()
export class ModuleService {

  constructor() { }

  getModules(): Promise<Module[]> {
    return Promise.resolve(MODULES);
  }
  getModulesSlowly(): Promise<Module[]> {
    return new Promise(resolve => {
      // Simulate server latency with 1 second delay
      setTimeout(() => resolve(this.getModules()), 1000);
    });
  }
  getModuleById(id: number): Promise<Module> {
      return this.getModules().then(modules => modules.find(module => module.id === id));
  }
  getModuleByCode(code: string): Promise<Module> {
      return this.getModules().then(modules => modules.find(module => module.code === name));
  }
}
