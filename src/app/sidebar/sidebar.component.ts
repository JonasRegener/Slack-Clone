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
  channels = new channels;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('New Channel found', changes);
        this.allChannels = changes;
      });
  }

}