import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { channels } from '../models/channels.class';
import { Firestore } from '@angular/fire/firestore';
import { GlobalVariablesService } from '../global-variables.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  allChannels = [];
  allMessages = [];
  selectedChat: string;
  channels = new channels;
  constructor(private firestore: AngularFirestore, public globalV: GlobalVariablesService) { }

  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('Channels are found', changes);
        this.allChannels = changes;
        this.getMessages();
        this.selectedChat = this.allChannels[0]['name'];
        this.globalV.setChannel(this.selectedChat);
        console.log('Messages are found', this.allChannels[0]['name']);
      });
  }
  getMessages() {
    this.firestore
      .collection('messages')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allMessages = changes;
      });
  }

  setChatVar(string: string) {
    this.globalV.setChannel(string);

  }

}