import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { FacebookService, InitParams, LoginResponse, LoginOptions } from "ngx-facebook";
import "rxjs/add/operator/toPromise";

@Injectable()
export class LoginService {

  public fbService: FacebookService;
  public fbProfile: string = null;

  public fbToken: any = null;
  public jwtToken: any = null;
  private http: Http;
  
  private options: LoginOptions = {
    scope: "public_profile, user_friends, email",
    return_scopes: true,
    enable_profile_selector: true
  };

  constructor(fbService: FacebookService, http: Http) { 
    this.fbService = fbService;
    this.http = http;

    let initParams: InitParams = {
      appId: "113701052652102",
      xfbml: true,
      version: "v2.8"
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

  secureApiGet(url: string) {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + this.jwtToken);
    return this.http.get(url, {
      headers: headers
    }).toPromise();
  }

  secureApiPost(url: string, body: string) {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + this.jwtToken); 
    return this.http.post(url, body, {
      headers: headers
    }).toPromise();
  }

  _loginWithFacebook() {
    this.fbService.login(this.options).then((response: LoginResponse) => {
      this.fbToken = response.authResponse.accessToken;
      return this._fetchFacebookProfile();
    }).then((fbProfile) => {
      return this._generateServerTokens(this.fbToken, this.fbProfile);
    }).then((response) => {
      let jwtToken = response.json()["token"];
      this.jwtToken = jwtToken;
      return jwtToken;
    }).catch((error: any) => {
      console.error(error);
    });
  }

  _logoutFromFacebook() {
    this.fbService.logout().then(() => {
      this.fbProfile = null;
      this.fbToken = null;
      this.jwtToken = null;
    });
  }

  _fetchFacebookProfile() {
    return this.fbService.api("/me?fields=id,email,name,picture").then((res) => {
      this.fbProfile = res;
      return this.fbProfile;
    }).catch((err) => {
      console.error(err);
    });
  }

  _generateServerTokens(fbToken: string, fbProfile: any) {
    let url = "https://api.nusreviews.com/generateServerToken";
    let query = "?fbToken=" + fbToken +
                "&email=" + fbProfile.email +
                "&name=" + fbProfile.name;

    return this.http.get(url + query).toPromise();
  }

}
