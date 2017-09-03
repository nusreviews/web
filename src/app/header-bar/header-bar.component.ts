import { Component, OnInit } from '@angular/core';
import { NavOption } from '../navOption';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  public appName: string = "NUS REVIEWS";

  public navOptions: NavOption[] = [
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
    },
    {
      name: "Modules",
      link: "/dashboard"
    },
  ];

  ngOnInit() {
  }

}
