import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
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

  constructor() {

  }

  input = '';

  ngOnInit(): void {
    this.editor2 = new Editor();

  }

  ngOnDestroy(): void {
    this.editor2.destroy();
  }


}
