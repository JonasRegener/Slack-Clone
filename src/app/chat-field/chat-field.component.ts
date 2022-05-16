import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMessageComponent } from '../dialog-edit-message/dialog-edit-message.component';
import { GlobalVariablesService } from '../global-variables.service';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-chat-field',
  templateUrl: './chat-field.component.html',
  styleUrls: ['./chat-field.component.scss']
})
export class ChatFieldComponent implements OnInit, OnChanges {

  threadView = false;
  disabled = true;
  loggedIn = 'Alexander Baraev';
  currentChannel = 'testChannel2';
  channelContent: any;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, public globalV: GlobalVariablesService) { }

  ngOnChanges() {
    console.log('changes:', this.threadView);
  }

  ngOnInit(): void {
    // ------ load all Channel entries from firebase ------
    this.firestore
      .collection('channels/' + this.currentChannel + '/threads')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((result) => {
        this.channelContent = result;
      })

    this.globalV.threadView.subscribe(item => {
      this.threadView = item;
    })
  }

  // Open message field for editing
  openEditor(content: any) {
    const dialogRef = this.dialog.open(DialogEditMessageComponent);
    dialogRef.componentInstance.input = content;
    // dialogRef.componentInstance.threadView = this.threadView;

    dialogRef.afterClosed().subscribe((result) => {
      console.log('content:', content);
    });
  }

  // add reaction
  addEmoji(index: number, reaction: string) {
    this.channelContent[index].reactions = reaction;
  }

  addComment(id: any, obj: any) {
    this.globalV.setThread(id);
    this.globalV.setThreadView(true);
    this.globalV.setObject(obj);
  }



}
