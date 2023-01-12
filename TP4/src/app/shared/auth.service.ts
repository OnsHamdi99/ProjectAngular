import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn=false;

  constructor(private router: Router) { }

  isLoggedIn() {
    const token = localStorage.getItem('jwt_token');
      if (token) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }


  logOut() {
    this.loggedIn = false;
  }

  // renvoie une promesse qui est résolue si l'utilisateur est loggué
  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }
}
