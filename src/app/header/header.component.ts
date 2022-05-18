import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../authentication/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../authentication/services/user.service';
import { User } from '../authentication/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  testicus = [];
  constructor(private firestore: AngularFirestore, public authService: AuthService, public auth: AngularFireAuth, public UserService: UserService) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({idField: 'uid'})
      .subscribe((changes: any) => {
        console.log('Recieved Users', changes);
        this.testicus = changes
      })
  }


  SignOut() {
    this.auth.signOut();

  }

}
