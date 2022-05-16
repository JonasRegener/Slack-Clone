import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { toHTML } from 'ngx-editor';
import { toDoc } from 'ngx-editor';
import { ChannelEntry } from '../models/channelEntry.class';
import { ChannelEntryContent } from '../models/channelEntryContent.class';
import { LoggedInUser } from '../models/loggedInUser.class';

@Component({
  selector: 'app-message-field',
  templateUrl: './message-field.component.html',
  styleUrls: ['./message-field.component.scss'],
})
export class MessageFieldComponent implements OnInit, OnDestroy, AfterViewInit {


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
  currentChannel = 'testChannel2';
  entry: any;

  constructor(private firestore: AngularFirestore) {
    this.loggedInUser = new LoggedInUser('Alexander Baraev', 'assets/img/profileAlex.jpg')
    console.log('show user:', this.loggedInUser);
  }

  ngOnInit(): void {
    this.editor = new Editor();
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
  addToChannel() {
    const today = new Date().toLocaleString('en-GB', { timeZone: 'CET' });
    let contentInput = this.html;
    this.content = new ChannelEntryContent(contentInput, today);
    this.entry = new ChannelEntry(this.loggedInUser, this.content);
    this.firestore
      .collection('channels/' + this.currentChannel + '/threads')
      .add(this.entry.toJSON())
      .then(() => {
        console.log();
        this.form.reset();
      })
  }



}


