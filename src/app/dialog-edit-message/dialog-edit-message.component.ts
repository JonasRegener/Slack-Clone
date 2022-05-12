import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-dialog-edit-message',
  templateUrl: './dialog-edit-message.component.html',
  styleUrls: ['./dialog-edit-message.component.scss']
})
export class DialogEditMessageComponent implements OnInit, OnDestroy {

  focused = true;
  editor2!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code']
  ];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  currentChannel = 'testChannel2';


  constructor(public dialogRef: MatDialogRef<DialogEditMessageComponent>, private firestore: AngularFirestore) {

  }

  content: string = '';
  input: any;
  threadView = false;

  ngOnInit(): void {
    this.editor2 = new Editor();
    this.content = this.input.content;
    if(this.threadView) {
      let element: any = document.querySelector('.cdk-overlay-container');
      element.style = 'width: 70%;';
    }
  }

  ngOnDestroy(): void {
    this.editor2.destroy();
  }

  saveChanges() {
    let changes: any = document.querySelectorAll('.NgxEditor__Content > p');
    this.input.content = changes[2].innerHTML;
    this.firestore
      .collection('channels/' + this.currentChannel + '/threads')
      .doc(this.input.customIdName)
      .update(JSON.parse(JSON.stringify(this.input)))
      .then(() => {
        console.log('after update',this.input.content);
        this.dialogRef.close();
      })
  }
}
