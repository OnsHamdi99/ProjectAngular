import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private http: HttpClient, private router:Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

    password : string = ""; 
    email : string="";
    username : string="";
    url = "http://localhost:8010/api/auth/";

    register(){
      const body = { email: this.email, name : this.username, password: this.password };
      this.http.post(this.url + '/register', body).subscribe(
        response => { 
          this.router.navigate(['/home']);
          this.snackBar.open("Bienvenue", "Fermer", {duration: 5000});
     
        }, 
        (error) => {
       this.snackBar.open("Identifiants incorrects", "Fermer", {duration: 5000}); } 
     )
    }
    
  
    
  
  }
  

