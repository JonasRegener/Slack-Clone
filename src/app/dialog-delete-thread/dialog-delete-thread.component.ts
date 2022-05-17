import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-dialog-delete-thread',
  templateUrl: './dialog-delete-thread.component.html',
  styleUrls: ['./dialog-delete-thread.component.scss']
})
export class DialogDeleteThreadComponent implements OnInit {

  input: any;
  currentChannel = 'testChannel2';


  constructor(public dialogRef: MatDialogRef<DialogDeleteThreadComponent>, private firestore: AngularFirestore, public globalV: GlobalVariablesService) { }

  ngOnInit(): void {
  }

  deleteThread() {
    this.firestore
      .collection('channels/' + this.currentChannel + '/threads')
      .doc(this.input.customIdName)
      .delete()
      .then(() => {
        this.globalV.setThreadView(false);
        this.dialogRef.close()
      })
  }


}
