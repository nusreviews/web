import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

@Injectable()
export class LoginService {

  public fbService: FacebookService;
  public fbProfile: any = null;

  private options: LoginOptions = {
    scope: 'public_profile, user_friends, email',
    return_scopes: true,
    enable_profile_selector: true
  };

  constructor(fbService: FacebookService) { 
    this.fbService = fbService;

    let initParams: InitParams = {
      appId: '113701052652102',
      xfbml: true,
      version: 'v2.8'
    };

    this.fbService.init(initParams);
    (<any>window).loginService = this;

    this.fbService.getLoginStatus().then((res) => {
      if (res.status === "connected") {
        this._fetchFacebookProfile();
      }
    });
  }

  getFacebookProfile() {
    return this.fbProfile;
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
      this._fetchFacebookProfile();
    }).catch((error: any) => {
      console.error(error);
    });
  }

  _logoutFromFacebook() {
    this.fbService.logout().then(() => {
      this.fbProfile = null;
    });
  }

  _fetchFacebookProfile() {
    this.fbService.api('/me?fields=id,email,name').then((res) => {
      this.fbProfile = res;
    }).catch((err) => {
      console.error(err);
    });
  }

}
