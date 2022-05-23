import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteCommentComponent } from '../dialog-delete-comment/dialog-delete-comment.component';
import { DialogDeleteThreadComponent } from '../dialog-delete-thread/dialog-delete-thread.component';
import { DialogEditMessageComponent } from '../dialog-edit-message/dialog-edit-message.component';
import { DialogEditThreadCommentComponent } from '../dialog-edit-thread-comment/dialog-edit-thread-comment.component';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-thread-field',
  templateUrl: './thread-field.component.html',
  styleUrls: ['./thread-field.component.scss']
})
export class ThreadFieldComponent implements OnInit {

  disabled = true;
  loggedIn = 'Alexander Baraev';
  currentChannel = 'testChannel2';
  threadContent: any;
  threadSelected: string = '';
  threadView: boolean = false;
  editorOpened = false;


  constructor(public dialog: MatDialog, private firestore: AngularFirestore, public globalV: GlobalVariablesService) { }

  ngOnInit(): void {
    // ------ FIRST OPTION ------
    // this.firestore
    //   .collection('channels')
    //   .valueChanges({ idField: 'customIdName' })
    //   .subscribe((result) => {
    //     this.tests = result;
    //     console.log(result);
    // })

    // this.threadView = this.globalV.getThreadView();
    // this.threadSelected = this.globalV.getThread();
    // console.log('selected:',this.globalV.getThread());

    
    this.globalV.getThreadView().subscribe(item => {
      this.threadView = item;
    })

    this.globalV.getEditor().subscribe(item => {
      this.editorOpened = item;
    })

    this.globalV.getChannel().subscribe(value => {
      this.currentChannel = value;
    })

    this.globalV.getThread().subscribe(item => {
      if (item) {
        this.threadSelected = item;
        this.firestore.collection('channels/' + this.currentChannel + '/threads/')
          .doc(item)
          .valueChanges({ idField: 'customIdName' })
          .subscribe((result) => {
            this.threadContent = result;
            console.log('selected: ', this.threadSelected);
          })
      }
    });


  }

  get sortComments() {
    return this.threadContent.comments.sort((a: any, b: any) => {
      return <any>new Date(a.postedAt) - <any>new Date(b.postedAt);
    });
  }

  convertToDate(time: number) {
    let convertedDate = new Date(time);
    return convertedDate.toLocaleString('en-GB', { timeZone: 'CET' });
  }

  // Open message field for editing
  openEditor(content: any, location: string, thread: any, index: number) {
    if (!this.editorOpened) {
      this.globalV.setEditor(true);

      console.log('rechts oben');

      const dialogRef = this.dialog.open(DialogEditThreadCommentComponent);
      dialogRef.componentInstance.input = content;
      dialogRef.componentInstance.editLocation = location;
      dialogRef.componentInstance.thread = thread;
      dialogRef.componentInstance.index = index;

      let element: any = document.querySelector('.cdk-overlay-container');
      element.style = 'width: 30%; left: unset; right: 0; bottom: 0; height: 100vh !important;'

      dialogRef.afterClosed().subscribe((result) => {
        console.log('content:', content);
        this.globalV.setEditor(false);
      });
    }
    else {
      alert('First finish editing your thread');
    }
  }

  // add reaction
  addEmoji(index: number, reaction: string) {
    if (index < 0) {
      this.threadContent.reactions = reaction;
    } else {
      this.threadContent.comments[index].reactions = reaction;
    }
  }

  addComment(content: any) {

  }

  getCommentlength() {
    if (this.threadContent.comments.length < 2) { return 'Antwort' }
    else { return 'Antworten' };
  }

  closeComments() {
    this.globalV.setThreadView(false);
  }

  deleteComment(content: any, index: number) {
    const dialogRef = this.dialog.open(DialogDeleteCommentComponent);
    dialogRef.componentInstance.input = content;
    dialogRef.componentInstance.index = index;

    dialogRef.afterClosed().subscribe((result) => {
      console.log('content:', content);
    });
  }

  deleteThread(content: any) {
    const dialogRef = this.dialog.open(DialogDeleteThreadComponent);
    dialogRef.componentInstance.input = content;

    dialogRef.afterClosed().subscribe((result) => {
      console.log('content:', content);
    });
  }

}

