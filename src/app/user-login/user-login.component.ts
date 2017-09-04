import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnChanges {

  @Input()
  public loginService: LoginService;
  userProfile = null;

  constructor(loginService: LoginService) { 
    this.loginService = loginService;
  }

  ngOnInit() {
    (<any>window).userLogin = this;
    if (this.loginService.fbProfile) {
      this.getUserProfile();
    } else {
      this.userProfile = null;
    }
  }

  ngOnChanges() {
    if (this.loginService.fbProfile) {
      console.log(this.loginService.fbProfile);
    } else {
      console.log("fb profile nullified");
    }
  }

  doFacebookLogin(): Promise<void> {
    return new Promise<void>((resolve, error) => {
      console.log('toggle');
      resolve(this.loginService.toggleFacebookLogin());
    });
  }

  getUserProfile() {
    this.loginService.secureApiGet("https://api.nusreviews.com/profile").then((res) => {
      console.log(res.json());
      this.userProfile = res.json();
      console.log(this.userProfile.displayName + " has logged in");
    }).catch((err) => {
      console.log("unauthorized");
      this.loginService._logoutFromFacebook();
    });    
  }

  doLogin() {
    this.doFacebookLogin()
    .then(x => {
      console.log('after logged in ' + this.loginService.fbProfile);
      if(this.loginService.fbProfile) {
        this.getUserProfile()
      } else {
        this.userProfile = null;
      }
    })
    .catch(x => console.log(x));
  }

  doLogout() {
    this.loginService._logoutFromFacebook();
  }
}
