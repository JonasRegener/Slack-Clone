import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Slack-Clone';

  loading = false;  // if true, loading animation is shown

  constructor(public router: Router) { }

  isLoggedIn() {
    return this.router.url === '/chat-field';
  }

}
