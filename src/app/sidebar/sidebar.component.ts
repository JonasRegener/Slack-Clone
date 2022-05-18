import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { channels } from '../models/channels.class';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  allChannels = [];
  allMessages = [];
  channels = new channels;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('Channels are found', changes);
        this.allChannels = changes;
        this.getMessages();
      });
  }
  getMessages() {
    this.firestore
      .collection('messages')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('Messages are found', changes);
        this.allMessages = changes;
    
      });
  }

}