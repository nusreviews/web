import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from './user';
import { USERS } from './mock-users';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return Promise.resolve(USERS);
  }
  getModulesSlowly(): Promise<User[]> {
    return new Promise(resolve => {
      // Simulate server latency with 1 second delay
      setTimeout(() => resolve(this.getUsers()), 1000);
    });
  }
  getUserById(id: number): Promise<User> {
      return this.getUsers().then(users => users.find(user => user.id === id));
  }
  getModuleByUsername(username: string): Promise<User> {
      return this.getUsers().then(users => users.find(user => user.username === username));
  }
  getModuleByEmail(email: string): Promise<User> {
      return this.getUsers().then(users => users.find(user => user.email === email));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
