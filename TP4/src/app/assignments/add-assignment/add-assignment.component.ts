import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // emetteur de l'événementy (nouvelAssignment)

  // du formulaire
  nomDevoir: string = '';
  dateDeRendu!: Date;
  nomMatiere: string ="";

  constructor(private assignmentsService:AssignmentsService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.nomDevoir + ' a rendre le ' + this.dateDeRendu);
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random()*1000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.matiere = this.nomMatiere;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    //this.assignments.push(newAssignment);
    //this.nouvelAssignment.emit(newAssignment);
    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(message => {
        console.log(message);
      });
  }
}
