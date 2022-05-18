import { Component, OnInit, OnChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMessageComponent } from '../dialog-edit-message/dialog-edit-message.component';
import { GlobalVariablesService } from '../global-variables.service';
import { Observable, Subject } from 'rxjs';
import { DialogDeleteThreadComponent } from '../dialog-delete-thread/dialog-delete-thread.component';
import { AuthGuard } from '../authentication/guard/auth.guard';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

  loading = true;
  disabled = true;
  loggedIn = 'Alexander Baraev';
  currentMessage = 'HTEeKWuco3CZLMJWWNgH';
  channelContent: any;
  user: any;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, public globalV: GlobalVariablesService) { 

  }

  ngOnInit(): void {

    // this.globalV.getChannel().subscribe(value => {
    //   this.currentMessage = value;
      this.firestore
      .collection('messages')
      .doc(this.currentMessage)
      .valueChanges({ idField: 'customIdName' })
      .subscribe((value) => {
        this.channelContent = value;
        this.loading = false;
      })
    // })

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
