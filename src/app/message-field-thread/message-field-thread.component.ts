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
  selector: 'app-message-field-thread',
  templateUrl: './message-field-thread.component.html',
  styleUrls: ['./message-field-thread.component.scss']
})
export class MessageFieldThreadComponent implements OnInit {


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
  threadSelected: string = '';
  threadObject: any;

  constructor(private firestore: AngularFirestore, public globalV: GlobalVariablesService) {
    this.loggedInUser = new LoggedInUser('Alexander Baraev', 'assets/img/profileAlex.jpg')
  }

  ngOnInit(): void {
    this.editor = new Editor();

    this.globalV.threadSelect.subscribe(item => {
      this.threadSelected = item;
    });


    this.globalV.threadObject.subscribe(item => {
      this.threadObject = item;            
    });
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
  addToThread() {
    const today = new Date().toLocaleString('en-GB', { timeZone: 'CET' });
    let contentInput = this.html;
    this.content = new ChannelEntryContent(contentInput, today);
    this.entry = new ChannelEntry(this.loggedInUser, this.content);

    this.threadObject.comments.push(this.entry);


    this.firestore
      .collection('channels/' + this.currentChannel + '/threads/')
      .doc(this.threadSelected)
      .update(JSON.parse(JSON.stringify(this.threadObject)))
      .then(() => {
        this.form.reset();
      })
      
  }

}
