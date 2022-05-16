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
  channelContent: any;
  threadView!: boolean;

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

    this.threadView = this.globalV.test;


    // ------ SECOND OPTION ------
    this.firestore.collection('channels/' + this.currentChannel + '/threads')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((result) => {
        this.channelContent = result;
      })
  }

  // Open message field for editing
  openDialog(content: any) {
    const dialogRef = this.dialog.open(DialogEditThreadCommentComponent);
    dialogRef.componentInstance.input = content;

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

  closeComments() {
    this.globalV.test = false;
    this.threadView = this.globalV.test;
    console.log('active:',this.globalV.test);
    
  }
}

