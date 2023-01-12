import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from './assignments/assignment.model';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver} from "@angular/cdk/layout"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion des assignments';
  footer = 'GitHub';

  constructor(private observer:BreakpointObserver,private authService:AuthService, private router:Router, private assignmentService: AssignmentsService) {}
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  ngAfterViewInit(){
    this.observer.observe(['(min-width:0px)'])
    .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = "over"; 
          this.sidenav.close();
        }
        else {
          this.sidenav.mode = "side"; 
          this.sidenav.open();
        }
    } )
  }
  initialiserLaBase (){
    this.assignmentService.peuplerBD();

  }
  getloggedIn(){
    return  this.authService.loggedIn;
  }
}
