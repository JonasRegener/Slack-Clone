import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMessageComponent } from '../dialog-edit-message/dialog-edit-message.component';
import { MessageFieldComponent } from '../message-field/message-field.component';

@Component({
  selector: 'app-chat-field',
  templateUrl: './chat-field.component.html',
  styleUrls: ['./chat-field.component.scss']
})
export class ChatFieldComponent implements OnInit {

  disabled = true;
  loggedIn = 'Alexander Baraev';

  channelContent = [
    {
      displayName: 'Alexander Baraev',
      photoURL: '/assets/img/profileAlex.jpg',
      posted: '22/05/10 07:33',
      content: 'Hi this is a Text',
      reactions: ''
    },
    {
      displayName: 'Mario Neubacher',
      photoURL: 'https://lh3.googleusercontent.com/a/AATXAJwtXDCa69ulgyD4-KaK8LufFXkWO7ELqNVi9LmsvA=s96-c',
      posted: '22/05/10 08:33',
      content: 'Hi this is a Text2',
      reactions: ''
    },
    {
      displayName: 'Jonas Regener',
      photoURL: '',
      posted: '22/05/10 09:33',
      content: 'Hi this is a Text3',
      reactions: ''
    }
  ]

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(content: string) {
    const dialogRef = this.dialog.open(DialogEditMessageComponent);
    dialogRef.componentInstance.input = content;
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addEmoji(index: number, reaction: string) {
    this.channelContent[index].reactions = reaction;
  }

  // edit(index: Number) {
  //   let content: any = document.getElementById('content-' + index);
  //   if(content.readOnly) {
  //     content.readOnly = false;
  //     content.focus();
  //   } else {
  //     content.readOnly = true;
  //   }
  // }



}
