import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavOption } from '../navOption';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  public appName: string = "NUS REVIEWS";
  private router: Router;

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

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit() {
  }

  redirectHome() {
    this.router.navigate(['/dashboard']);
  }

}
