import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { toHTML } from 'ngx-editor';
import { toDoc } from 'ngx-editor';
import { GlobalVariablesService } from '../global-variables.service';
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
  loggedIn: any;
  content: any;
  currentChannel = '';
  entry: any;
  user: any;

  constructor(private firestore: AngularFirestore, public globalV: GlobalVariablesService) {

    this.globalV.getUser().subscribe(user => {
      this.user = user;
      this.getUserName();
    })

    this.globalV.getChannel().subscribe(result => {
      this.currentChannel = result;
    })
  }

  ngOnInit(): void {


    this.editor = new Editor();
  }

  getUserName() {
    this.firestore
      .collection('users')
      .doc(this.user.uid)
      .valueChanges()
      .subscribe((result: any) => {
        if (result) {
          console.log(result);

          this.loggedInUser = new LoggedInUser(result.displayName, result.photoURL)
        }
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
  addToChannel() {
    // const today = new Date().toLocaleString('en-GB', { timeZone: 'CET' });
    const today = new Date().getTime();
    let contentInput = this.form.controls['editorContent'].value;

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


