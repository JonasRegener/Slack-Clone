import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-channel-info',
  templateUrl: './dialog-channel-info.component.html',
  styleUrls: ['./dialog-channel-info.component.scss']
})
export class DialogChannelInfoComponent implements OnInit {

  content: any;

  constructor(public dialogRef: MatDialogRef<DialogChannelInfoComponent>) { }

  ngOnInit(): void {
  }

}
