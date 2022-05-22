import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { AuthService } from '../authentication/services/auth.service';
import { UserService } from '../authentication/services/user.service';
import { GlobalVariablesService } from '../global-variables.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  channel!: string;

  constructor(private firestore: AngularFirestore, public authService: AuthService, public auth: AngularFireAuth, public UserService: UserService, private route: ActivatedRoute, public globalV: GlobalVariablesService) { }
  bankName = '';
  mussfunktionieren: any = {};
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bankName = params['id'];
      console.log('Got it ', this.bankName)
      this.getUser();
    })

    this.globalV.getChannel().subscribe(value => {
      this.channel = value;
    })

  }

  getUser() {
    this.firestore
      .collection('users')
      .doc(this.bankName)
      .valueChanges()
      .subscribe((user: any) => {
        JSON.stringify(this.mussfunktionieren)
        this.mussfunktionieren = user;
        console.log('Erhalten', this.mussfunktionieren)

      })
  }
}
