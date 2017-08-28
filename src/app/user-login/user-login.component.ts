import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  private fbService: FacebookService;
  public fbProfile: any;

  private options: LoginOptions = {
    scope: 'public_profile, user_friends, email',
    return_scopes: true,
    enable_profile_selector: true
  };

  ngOnInit() {
  }

  constructor(fbService: FacebookService) { 
    this.fbService = fbService;

    let initParams: InitParams = {
      appId: '113701052652102',
      xfbml: true,
      version: 'v2.8'
    };

    fbService.init(initParams);
    (<any>window).userLogin = this;

    this.fbService.getLoginStatus().then((res) => {
      if (res.status === "connected") {
        this.getFacebookProfile();
      }
    });
  }

  loginWithFacebook() {
    this.fbService.login(this.options).then((response: LoginResponse) => {
      console.log(response);
      this.getFacebookProfile();
    }).catch((error: any) => {
      console.error(error)
    });
  }

  logoutFromFacebook() {
    this.fbService.logout().then(() => {
      console.log('Logged out!');
      this.fbProfile = undefined;
    });
  }

  getFacebookProfile() {
    this.fbService.api('/me?fields=id,email,name').then((res) => {
      this.fbProfile = res;
    }).catch((err) => {
      throw new err;
    });
  }

}
