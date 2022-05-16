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
  threadView!: boolean;
  textHTML: string = '';


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


    this.globalV.threadView.subscribe(item => {
      this.threadView = item;
    })

    this.globalV.threadSelect.subscribe(item => {
      this.threadSelected = item;
      this.firestore.collection('channels/' + this.currentChannel + '/threads/')
      .doc(item)
      .valueChanges({ idField: 'customIdName' })
      .subscribe((result) => {
        this.threadContent = result;
        console.log('selected: ',this.threadSelected);
        
      })
    });
    // })
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
    this.threadContent[index].reactions = reaction;
  }

  addComment(content: any) {

  }

  getCommentlength() {
    if(this.threadContent.comments.length < 2){ return 'Antwort'}
    else { return 'Antworten'};
  }

  closeComments() {
    this.globalV.setThreadView(false);
  }

}

