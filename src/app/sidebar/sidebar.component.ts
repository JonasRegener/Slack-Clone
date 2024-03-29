import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { channels } from '../models/channels.class';
import { Firestore } from '@angular/fire/firestore';
import { GlobalVariablesService } from '../global-variables.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateMessageComponent } from '../dialog-create-message/dialog-create-message.component';
import { NewChannelComponent } from '../new-channel/new-channel.component';
import { doc, deleteDoc } from "firebase/firestore";



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  allChannels = [];
  allMessages = [];
  deleteItem = '';
  user: any;
  newChannelname = '';
  userDB: any;
  test = '';
  selectedChat!: string;
  channels = new channels;
  constructor(private firestore: AngularFirestore, public globalV: GlobalVariablesService, public dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((changes: any) => {
        console.log('Channels are found', changes);
        this.allChannels = changes;
        this.getMessages();
        this.selectedChat = this.allChannels[0]['name'];
        this.test = this.allChannels[0]['name'];
        this.globalV.setChannel(this.selectedChat);
        console.log('Messages are found', this.allChannels[0]['name']);
      });

    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((result: any) => {
        this.userDB = result;
      })
  }

  getMessages() {
    this.firestore
      .collection('messages')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allMessages = changes;
      });

  }

  getReceiverName(receiverUID: string) {
    for (let i = 0; i < this.userDB.length; i++) {
      if (this.userDB[i].uid == receiverUID) {
        return this.userDB[i].displayName;
      }
    }
  }


  setChatVar(string: string) {
    this.globalV.setChannel(string);
    this.test = string;

  }


  setMessageVar(string: string) {
    this.globalV.setMessage(string);
    this.test = string;

  }

  createMessage() {
    const dialogRef = this.dialog.open(DialogCreateMessageComponent);

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  createNewChannel() {
    const dialogRef = this.dialog.open(NewChannelComponent);

    dialogRef.afterClosed().subscribe((result) => {
    });
  }
  deleteChannel(afterAll: string) {
    console.log('Test', afterAll)

    this.firestore
      .collection('channels')
      .doc(afterAll)
      .delete()
      




  }
  deleteSth(afterAll: any) {
    //   console.log('Test', afterAll)

    //  this.firestore
    //    .collection('messages')
    //    .doc()
    //    .delete()




  }
}