import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMessageComponent } from '../dialog-edit-message/dialog-edit-message.component';
import { GlobalVariablesService } from '../global-variables.service';
import { Observable, Subject } from 'rxjs';
import { DialogDeleteThreadComponent } from '../dialog-delete-thread/dialog-delete-thread.component';
import { DialogChannelInfoComponent } from '../dialog-channel-info/dialog-channel-info.component';
import { User } from '../authentication/services/user.service';
@Component({
  selector: 'app-chat-field',
  templateUrl: './chat-field.component.html',
  styleUrls: ['./chat-field.component.scss']
})
export class ChatFieldComponent implements OnInit {

  loading = true;
  threadView = false;
  disabled = true;
  loggedIn = '';
  currentChannel = '';
  channelContent: any;
  editorOpened = false;
  user: any;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, public globalV: GlobalVariablesService) { }

  ngOnInit(): void {
    // ------ load all Channel entries from firebase ------


    this.globalV.getUser().subscribe(user => {
      this.user = user;
    })


    this.globalV.getThreadView().subscribe(item => {
      this.threadView = item;
    })

    this.globalV.getEditor().subscribe(item => {
      this.editorOpened = item;
    })

    this.globalV.getChannel().subscribe(value => {
      if (value) {
        this.currentChannel = value;
        this.firestore
          .collection('channels/' + this.currentChannel + '/threads')
          .valueChanges({ idField: 'customIdName' })
          .subscribe((result) => {
            this.channelContent = result;
            setTimeout(() => {
              this.loading = false;
              this.getUserName();
            }, 3000);
          })
      }
    })
  }

  getUserName() {
    this.firestore
      .collection('users')
      .doc(this.user.uid)
      .valueChanges()
      .subscribe((result: any) => {
        this.loggedIn = result.displayName;
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
    if (!this.editorOpened) {
      this.globalV.setEditor(true);
      const dialogRef = this.dialog.open(DialogEditMessageComponent);

      dialogRef.componentInstance.input = content;

      let element: any = document.querySelector('.cdk-overlay-container');
      if (this.threadView) {
        element.style = 'width: 55%; left: 15%; right: 30%;';
      }
      if (!this.threadView) {
        element.style = 'width: 85%; left: 15%;';
      }

      dialogRef.afterClosed().subscribe((result) => {
        this.globalV.setEditor(false);
      });
    }
    else {
      alert('First finish editing your comment');
    }
  }

  openChannelInfo() {
    const dialogRef = this.dialog.open(DialogChannelInfoComponent);


    dialogRef.afterClosed().subscribe((result) => {

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

    dialogRef.afterClosed().subscribe((result) => {
    });
  }


  getCommentlength(length: number) {
    if (length < 2) { return 'Antwort' }
    else { return 'Antworten' };
  }

}
