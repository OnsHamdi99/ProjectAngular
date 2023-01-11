import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password : string = ""; 
  email : string="";
  url = "http://localhost:8010/api/auth/AuthContoller";
  constructor(private http: HttpClient, private router:Router,private snackBar: MatSnackBar) { }


  ngOnInit(): void {
  }
  login(){
    const body = { email: this.email, password: this.password };
    this.http.post(this.url + '/login', body).subscribe(
      response => { 
        this.router.navigate(['/home']);
      }, 
      (error) => {
     this.snackBar.open("Identifiants faux", "Fermer", {duration: 2000}); } 
   )
  }
  

  

}
