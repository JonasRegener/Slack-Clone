import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../authentication/services/auth.service';
import { UserService } from '../authentication/services/user.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  usersId = '';

  constructor(private firestore: AngularFirestore, public authService: AuthService, public auth: AngularFireAuth, public UserService: UserService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
  
  }

}
