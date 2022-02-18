import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from './students.service';
import { Employee } from './employee';
import { Route } from '@angular/compiler/src/core';
import { NavigationStart, Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHead: boolean;
  
  
  constructor(private router: Router){
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url']=='/' || event['url']=='/register') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
 
  
  ngOnInit(){
    
  }
}

