import { Component, OnInit } from '@angular/core';
import { NavOption } from '../navOption';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  appName: string = "NUS REVIEWS";

  navOptions: NavOption[] = [
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

  constructor() { }

  ngOnInit() {
  }

}
