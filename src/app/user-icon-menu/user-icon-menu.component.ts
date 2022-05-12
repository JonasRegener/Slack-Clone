import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/services/auth.service';

@Component({
  selector: 'app-user-icon-menu',
  templateUrl: './user-icon-menu.component.html',
  styleUrls: ['./user-icon-menu.component.scss']
})
export class UserIconMenuComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
