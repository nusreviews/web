import { Component, OnInit } from '@angular/core';
import { NavOption } from '../navOption';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  public appName: string = "NUS REVIEWS";
  private fbService: FacebookService;
  public fbProfile: any;

  public navOptions: NavOption[] = [
    {
      name: "Modules",
      link: "/dashboard"
    },
    {
      name: "About",
      link: "/about"
    }, 
    {
      name: "Privacy", 
      link: "/privacy"
    },
    {
      name: "Terms", 
      link: "/tos"
    }
  ];

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

    fbService.init(initParams);
    (<any>window).fbService = this.fbService;
    (<any>window).headerComponent = this;

    this.fbService.getLoginStatus().then((res) => {
      if (res.status === "connected") {
        this.getFacebookProfile();
      }
    });
  }

  ngOnInit() {
  }

  loginWithFacebook() {
    this.fbService.login(this.options).then((response: LoginResponse) => {
      console.log(response);
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
    this.fbService.api('/me').then((res) => {
      this.fbProfile = res;
    }).catch((err) => {
      throw new err;
    });
  }

}
