import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GlobalVariablesService } from './global-variables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Slack-Clone';

  allChannels = [];
  selectedChat!: string;


  constructor(public router: Router, public globalV: GlobalVariablesService, private firestore: AngularFirestore) {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('Channels are found', changes);
        this.allChannels = changes;
        this.selectedChat = this.allChannels[0]['name'];
        this.globalV.setChannel(this.selectedChat);
      });
  }

  isLoggedIn() {
    return this.router.url !== '/';
  }

}
