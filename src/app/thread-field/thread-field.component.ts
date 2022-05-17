import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
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

    this.globalV.getThread().subscribe(item => {
      this.threadSelected = item;
      this.firestore.collection('channels/' + this.currentChannel + '/threads/')
        .doc(item)
        .valueChanges({ idField: 'customIdName' })
        .subscribe((result) => {
          this.threadContent = result;
          console.log('selected: ', this.threadSelected);
        })
    });

    this.globalV.getThreadView().subscribe(item => {
      this.threadView = item;
    })

  }

  // Open message field for editing
  openEditor(content: any, location: string, thread: any, index: number) {
    console.log('rechts oben');

    const dialogRef = this.dialog.open(DialogEditThreadCommentComponent);
    dialogRef.componentInstance.input = content;
    dialogRef.componentInstance.editLocation = location;
    dialogRef.componentInstance.thread = thread;
    dialogRef.componentInstance.index = index;

    let element: any = document.querySelector('.cdk-overlay-container');
    element.style = 'width: 30%; left: unset; right: 0;'

    dialogRef.afterClosed().subscribe((result) => {
      console.log('content:', content);
    });
  }

  // add reaction
  addEmoji(index: number, reaction: string) {
    if(index < 0) {
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

}

