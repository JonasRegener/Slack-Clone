import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMessageComponent } from '../dialog-edit-message/dialog-edit-message.component';

@Component({
  selector: 'app-chat-field',
  templateUrl: './chat-field.component.html',
  styleUrls: ['./chat-field.component.scss']
})
export class ChatFieldComponent implements OnInit {

  disabled = true;
  loggedIn = 'Alexander Baraev';
  currentChannel = 'testChannel2';
  channelContent: any;
  threadView = true;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    // ------ load all Channel entries from firebase ------
    this.firestore
      .collection('channels/' + this.currentChannel + '/threads')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((result) => {
        this.channelContent = result;
      })
  }

  // Open message field for editing
  openDialog(content: any) {
    const dialogRef = this.dialog.open(DialogEditMessageComponent);
    dialogRef.componentInstance.input = content;
    dialogRef.componentInstance.threadView = this.threadView;

    dialogRef.afterClosed().subscribe((result) => {
      console.log('content:', content);
    });
  }

  // add reaction
  addEmoji(index: number, reaction: string) {
    this.channelContent[index].reactions = reaction;
  }

  addComment(content: any) {

  }
}