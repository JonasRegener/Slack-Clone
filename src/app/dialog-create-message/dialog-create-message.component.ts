import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalVariablesService } from '../global-variables.service';
import { MessageForm } from '../models/messageForm.class';

@Component({
  selector: 'app-dialog-create-message',
  templateUrl: './dialog-create-message.component.html',
  styleUrls: ['./dialog-create-message.component.scss']
})
export class DialogCreateMessageComponent implements OnInit {

  loggedIn: any;
  users: any;
  newMessage!: MessageForm;

  constructor(public dialogRef: MatDialogRef<DialogCreateMessageComponent>, private firestore: AngularFirestore, public globalV: GlobalVariablesService, public router: Router) { }

  ngOnInit(): void {

    this.globalV.getUser().subscribe(user => {
      this.loggedIn = user;
    })

    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe(result => {
        this.users = result;
      })
  }

  openChat(userID: string){
    console.log('receiverID:',userID);
    console.log('sentBy:', this.loggedIn.uid);
    const today = new Date().getTime();

    this.newMessage = new MessageForm(this.loggedIn.uid, userID, '', today);
    

    this.firestore
      .collection('messages')
      .add(JSON.parse(JSON.stringify(this.newMessage)))
      .then((docRef) => {
        this.dialogRef.close();
        this.globalV.setMessage(docRef.id);
        this.router.navigateByUrl('messaging/' + docRef.id);
      })
    
  }

}
