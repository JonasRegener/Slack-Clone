import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { toHTML } from 'ngx-editor';
import { toDoc } from 'ngx-editor';
import { ChannelEntry } from '../models/channelEntry.class';
import { ChannelEntryContent } from '../models/channelEntryContent.class';
import { LoggedInUser } from '../models/loggedInUser.class';
import { Message } from '../models/message.class';


@Component({
  selector: 'app-message-field-private',
  templateUrl: './message-field-private.component.html',
  styleUrls: ['./message-field-private.component.scss']
})
export class MessageFieldPrivateComponent implements OnInit, OnDestroy, AfterViewInit {



  html: any;

  // Editor settings
  focused = false;
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code']
  ];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  loggedInUser: any;
  content: any;
  currentMessage = 'HTEeKWuco3CZLMJWWNgH';
  sendMessage: any;

  constructor(private firestore: AngularFirestore) {
    this.loggedInUser = new LoggedInUser('Alexander Baraev', 'assets/img/profileAlex.jpg')
    console.log('show user:', this.loggedInUser);
  }

  ngOnInit(): void {
    this.editor = new Editor();

    this.firestore
      .collection('messages')
      .doc(this.currentMessage)
      .valueChanges()
      .subscribe((value) => {
        this.content = value;
      })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  // Event Listener for focusing the message field
  ngAfterViewInit(): void {
    let editor: any = document.querySelector('.NgxEditor__Content');
    editor.addEventListener('focusin', this.setFocused.bind(this));
    editor.addEventListener('focusout', this.unsetFocused.bind(this));
  }

  setFocused() {
    this.focused = true;
  }

  unsetFocused() {
    this.focused = false;
  }

  // Add to the Channel JSON
  addToChat() {
    const today = new Date().toLocaleString('en-GB', { timeZone: 'CET' });
    let contentInput = this.form.controls['editorContent'].value;
    
    this.sendMessage = new Message('sentByUID', 'receiverUID', contentInput, today);
    
    this.content.replies.push(this.sendMessage);
    
    this.firestore
      .collection('messages')
      .doc(this.currentMessage)
      .update(JSON.parse(JSON.stringify(this.content)))
      .then(() => {
        this.form.reset();
        console.log(this.content);
      })
  }

}


