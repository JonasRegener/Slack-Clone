import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-dialog-delete-comment',
  templateUrl: './dialog-delete-comment.component.html',
  styleUrls: ['./dialog-delete-comment.component.scss']
})
export class DialogDeleteCommentComponent implements OnInit {

  input: any;
  index!: number;
  currentChannel = 'testChannel2';


  constructor(public dialogRef: MatDialogRef<DialogDeleteCommentComponent>, private firestore: AngularFirestore, public globalV: GlobalVariablesService) { }

  ngOnInit(): void {
  }

  deleteComment() {
    console.log('input:',this.input.comments[this.index]);
    console.log('index:',this.index);
    
    this.input.comments.splice(this.index, 1);
    this.firestore
      .collection('channels/' + this.currentChannel + '/threads')
      .doc(this.input.customIdName)
      .update(JSON.parse(JSON.stringify(this.input)))
      .then(() => {
        this.dialogRef.close();
      })
  }

}
