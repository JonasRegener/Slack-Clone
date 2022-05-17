import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMessageComponent } from '../dialog-edit-message/dialog-edit-message.component';
import { GlobalVariablesService } from '../global-variables.service';
import { Observable, Subject } from 'rxjs';
import { DialogDeleteThreadComponent } from '../dialog-delete-thread/dialog-delete-thread.component';
@Component({
  selector: 'app-chat-field',
  templateUrl: './chat-field.component.html',
  styleUrls: ['./chat-field.component.scss']
})
export class ChatFieldComponent implements OnInit, OnChanges {

  loading = true;
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
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      })

    this.globalV.threadView.subscribe(item => {
      this.threadView = item;
    })
  }

  // Open message field for editing
  openEditor(content: any) {
    const dialogRef = this.dialog.open(DialogEditMessageComponent);
    console.log('unten');

    dialogRef.componentInstance.input = content;
    // dialogRef.componentInstance.threadView = this.threadView;

    let element: any = document.querySelector('.cdk-overlay-container');
    element.style = 'width: 100%;';

    dialogRef.afterClosed().subscribe((result) => {
      console.log('content:', content);
    });
  }

  // add reaction
  addEmoji(index: number, reaction: string) {
    this.channelContent[index].reactions = reaction;
  }

  addComment(obj: any) {
    this.globalV.setObject(obj);
    this.globalV.setThread(obj.customIdName);
    this.globalV.setThreadView(true);
  }

  deleteThread(content: any) {
    const dialogRef = this.dialog.open(DialogDeleteThreadComponent);
    dialogRef.componentInstance.input = content;
    // dialogRef.componentInstance.threadView = this.threadView;

    dialogRef.afterClosed().subscribe((result) => {
      console.log('content:', content);
    });
  }


  getCommentlength(length: number) {
    if (length < 2) { return 'Antwort' }
    else { return 'Antworten' };
  }

}
