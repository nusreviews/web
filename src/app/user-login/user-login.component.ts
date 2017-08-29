import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  private fbService: FacebookService;
  public fbProfile: any = null;

  private options: LoginOptions = {
    scope: 'public_profile, user_friends, email',
    return_scopes: true,
    enable_profile_selector: true
  };

  constructor(fbService: FacebookService) { 
    this.fbService = fbService;
  }

  ngOnInit() {
    let initParams: InitParams = {
      appId: '113701052652102',
      xfbml: true,
      version: 'v2.8'
    };

    this.fbService.init(initParams);
    (<any>window).userLogin = this;

    this.fbService.getLoginStatus().then((res) => {
      if (res.status === "connected") {
        this.fetchFacebookProfile();
      }
    });
  }

  fetchFacebookProfile() {
    this.fbService.api('/me?fields=id,email,name').then((res) => {
      this.fbProfile = res;
    }).catch((err) => {
      console.error(err);
    });
  }

  toggleFacebookLogin() {
    if (this.fbProfile === null) {
      this._loginWithFacebook();
    } else {
      this._logoutFromFacebook();
    }
  }

  _loginWithFacebook() {
    this.fbService.login(this.options).then((response: LoginResponse) => {
      console.log(response);
      this.fetchFacebookProfile();
    }).catch((error: any) => {
      console.error(error);
    });
  }

  _logoutFromFacebook() {
    this.fbService.logout().then(() => {
      console.log('Logged out!');
      this.fbProfile = null;
    });
  }

}
