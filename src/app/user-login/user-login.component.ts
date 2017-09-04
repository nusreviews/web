import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public loginService: LoginService;

  constructor(loginService: LoginService) { 
    this.loginService = loginService;
  }

  ngOnInit() {
    (<any>window).userLogin = this;
    if (this.loginService.getProfile()) {
      console.log(this.loginService.getProfile().nusreviews);
    }
  }

  toggleFacebookLogin() {
    this.loginService.toggleFacebookLogin();
  }
}
