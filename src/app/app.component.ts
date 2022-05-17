import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariablesService } from './global-variables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Slack-Clone';


  constructor(public router: Router, public globalV: GlobalVariablesService) {
    this.globalV.setChannel('testChannel2');    
   }

  isLoggedIn() {
    return this.router.url === '/chat-field';
  }

}
