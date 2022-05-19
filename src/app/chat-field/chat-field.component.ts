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
export class ChatFieldComponent implements OnInit {

  loading = true;
  threadView = false;
  disabled = true;
  loggedIn = 'Alexander Baraev';
  currentChannel = '';
  channelContent: any;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, public globalV: GlobalVariablesService) { }

  ngOnInit(): void {
    // ------ load all Channel entries from firebase ------
    
    this.globalV.getChannel().subscribe(value => {
      this.currentChannel = value;
      this.firestore
      .collection('channels/' + this.currentChannel + '/threads')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((result) => {
        this.channelContent = result;
        setTimeout(() => {
          this.loading = false;
          console.log(new Date(this.channelContent[0].postedAt));
          
        }, 3000);
      })
    })

    this.globalV.getThreadView().subscribe(item => {
      this.threadView = item;      
    })
  }

  get sortChannel() {
    return this.channelContent.sort((a: any, b: any) => {
      return <any>new Date(b.postedAt) - <any>new Date(a.postedAt);
    });
  }

  convertToDate(time: number) {
    let convertedDate = new Date(time);
    return convertedDate.toLocaleString('en-GB', { timeZone: 'CET' });
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
