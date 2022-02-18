import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showLogin: boolean;

  constructor(private router: Router){
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/register') {
          this.showLogin = true;
        } else {
          this.showLogin = false;
        }
      }
    });
  }

  ngOnInit(): void {
    
  }

}
