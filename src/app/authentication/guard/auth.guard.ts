import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    // if (this.authService.isLoggedIn !== true) {
    //   this.router.navigate([''])
    // }
    // this.router.navigate(['/channels'])
    // return true;
    if(this.authService.isLoggedIn) {
      return true;
    }
    else {
      return this.router.parseUrl('');
    }
  }
}