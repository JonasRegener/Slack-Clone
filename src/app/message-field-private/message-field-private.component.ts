import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { toHTML } from 'ngx-editor';
import { toDoc } from 'ngx-editor';
import { GlobalVariablesService } from '../global-variables.service';
import { ChannelEntry } from '../models/channelEntry.class';
import { ChannelEntryContent } from '../models/channelEntryContent.class';
import { LoggedInUser } from '../models/loggedInUser.class';
import { MessageForm } from '../models/messageForm.class';


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
  currentMessage = '';
  sendMessage: any;
  user: any;

  constructor(private firestore: AngularFirestore, public globalV: GlobalVariablesService, private cd: ChangeDetectorRef) {
    

  }

  ngOnInit(): void {
    this.editor = new Editor();

    this.globalV.getMessage().subscribe(result => {
      this.currentMessage = result;
      this.getMessages();
    })

    this.globalV.getUser().subscribe(user => {
      this.loggedInUser = user;
    })

  }



  getMessages() {
    this.firestore
    .collection('messages')
    .doc(this.currentMessage)
    .valueChanges({ idField: 'customIdName' })
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
    // const today = new Date().toLocaleString('en-GB', { timeZone: 'CET' });
    const today = new Date().getTime();
    let contentInput = this.form.controls['editorContent'].value;
    
    this.sendMessage = new MessageForm(this.loggedInUser.uid, 'receiverUID', contentInput, today);
    
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


