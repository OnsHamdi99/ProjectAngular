import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password : string = ""; 
  email : string="";
  url = "http://localhost:8010/api/auth";
  constructor(private http: HttpClient, private router:Router,private snackBar: MatSnackBar, private authService:  AuthService ) { }

  ngOnInit(): void {
  }
  login(){
    const body = { email: this.email, password: this.password };
    this.http.post(this.url + '/login', body)
    .subscribe(
      (response : any )=> { 
        const token = (response as {token: string}).token;
        localStorage.setItem('jwt_token', token);
        this.router.navigate(['/home']);
        this.snackBar.open("Bienvenue", "Fermer", {duration: 5000});
        this.authService.loggedIn = true;
      }, 
      (error) => {
        console.log(error)
     this.snackBar.open("Identifiants faux", "Fermer", {duration: 5000}); } 
   )
  }
  

  

}
