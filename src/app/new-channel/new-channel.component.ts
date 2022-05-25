import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../authentication/services/user.service';
import { GlobalVariablesService } from '../global-variables.service';
import { channels } from '../models/channels.class';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.scss']
})
export class NewChannelComponent implements OnInit {
  allChannels = [];
  allMessages = [];
  user: any;
  users: any;
  newChannelName = '';
  userDB: any;
  test = '';
  data: any;
  selectedChat!: string;
  channels = new channels;
  loggedIn: any;
  constructor(public dialogRef: MatDialogRef<NewChannelComponent>, public firestore: AngularFirestore, public globalV: GlobalVariablesService, public router: Router) {
  }

  ngOnInit(): void {

    this.globalV.getUser().subscribe(user => {
      this.loggedIn = user;
    })

    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('Channels are found', changes);
        this.allChannels = changes;

      });
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe(result => {
        this.users = result;
      })



  }

  createNewChannel() {
    console.log(this.loggedIn.displayName)


    this.firestore
      .collection('channels')
      .add({
        'name': this.newChannelName, 'members': // this.loggedIn.displayName 
          'Test variable leider Leer deswegen Fehlerhaft'
      })
      .then((docRef) => {
        this.dialogRef.close();
        this.globalV.setChannel(this.newChannelName);
        this.router.navigateByUrl('channels/' + this.data);

      })
  }
}