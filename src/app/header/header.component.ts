import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../authentication/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private firestore: AngularFirestore, public authService: AuthService, public auth: AngularFireAuth) { }

  ngOnInit(): void {

    }
    
  
    SignOut() {
    this.auth.signOut();
    
  }

}
