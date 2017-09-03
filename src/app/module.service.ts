import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Module } from './module';
import { MODULES } from './mock-modules';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModuleService {
    
    constructor(private http: Http) { }
    
    getModules(): Promise<Module[]> {
        return this.http.get('https://api.nusreviews.com/getModulesFullAttribute')
        .toPromise()
        .then(response => {
            let jsonArray = response.json()["modules"];
            let modules = jsonArray.map(function(x) {
                let deserialisedModule = Module.deserialiseJson(x);
                return deserialisedModule;
            });
            console.log(modules);
            return modules;
        }) 
        .catch(this.handleError);
    }
    getModulesSlowly(): Promise<Module[]> {
        return new Promise(resolve => {
            // Simulate server latency with 1 second delay
            setTimeout(() => resolve(this.getModules()), 1000);
        });
    }
    getModuleById(id: string): Promise<Module> {
        // return this.getModules().then(modules => modules.find(module => module.id === id));
        return this.http.get('https://api.nusreviews.com/getModulesFullAttribute?' + 'modId=' + id + '&strict=true')
        .toPromise()
        .then(response => {
            let module: Module = null;
            let jsonArray: [JSON] = response.json()['modules'];

            // If input ID fetches a valid module
            if (jsonArray.length > 0) {
                module = jsonArray.map(function(x) {
                    let deserialisedModule = Module.deserialiseJson(x);
                    return deserialisedModule;
                })[0];
                console.log(module);
            }

            return module;
        }) 
        .catch(this.handleError);
    }
    
    // UNUSED 
    getModuleByCode(code: string): Promise<Module> {
        return this.getModules().then(modules => modules.find(module => module.code === name));
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
