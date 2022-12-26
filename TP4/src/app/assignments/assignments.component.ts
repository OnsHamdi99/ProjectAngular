import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { bdInitialAssignments } from '../shared/data';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Mon application sur les assignments';

  assignments!: Assignment[];
  page: number=1;
  limit: number=10;
  totalDocs: number=0;
  totalPages: number=0;
  hasPrevPage: boolean=false;
  prevPage: number=0;
  hasNextPage: boolean=false;
  nextPage: number=0;
 
  assignmentSelectionne!: Assignment;

  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {
    /*this.assignmentsService
      .getAssignments()
      .subscribe((tableauDesAssignmentsObservable) => {
        this.assignments = tableauDesAssignmentsObservable;
      }); */
      this.getAssignments();

 
  }
  getAssignments(){
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
    .subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues");
    });
  }
  onAssignmentClicke(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }
  pageSuivante(){
    if(this.hasNextPage){
    this.page = this.nextPage;
    this.getAssignments();
  }
}
pagePrecedente(){
  if(this.hasPrevPage){
    this.page= this.prevPage;
    this.getAssignments();
  }
}
premierePage(){
  this.page=1;
  this.getAssignments();
}
dernierePage(){
  this.page= this.totalPages;
  this.getAssignments();

}
}
