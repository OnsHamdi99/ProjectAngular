import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [

    ];

  constructor(private logginService:LoggingService, 
              private http:HttpClient) { }
  
  url = "https://ovt-project-angular-server.onrender.com";
  //http://localhost:8010/api/assignments
  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]> (this.url);
  }

  getAssignmentsPagine(page:number, limit:number, query: {nom:string, matiere:string, rendu:string}):Observable <any>{
    var queryString = this.generateQueryString(query);
    page++;
    return this.http.get<any>(this.url + "?page=" + page + "&limit=" + limit + "&"+queryString);
  }

  //create a query string from an object
  generateQueryString(query: any):string {
    let queryString = "";
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        const value = query[key];
        if (value != null)
          queryString += key + "=" + value + "&";
      }
    }
    return queryString;
  }

  // renvoie comme Observable l'assignment dont l'id est passé
  // en paramètre, ou undefined s'il n'existe pas
  getAssignment(id:number):Observable<Assignment> {
  //  const a:Assignment|undefined = this.assignments.find(a => a.id === id);
   // if(a)
    //console.log("getAssignment id= " + id + " nom = " + a.nom)
    //return of(a);
    return this.http.get<Assignment>(this.url+"/"+id);
  }

  addAssignment(assignment:Assignment):Observable<any> {
//    this.assignments.push(assignment);

 //   this.logginService.log(assignment.nom, "ajouté !");

  //  return of("Assignment ajouté");
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // On n'a besoin de rien faire pour le moment, puisque l'assignment est passé par référence
    // et que l'objet est modifié dans le tableau
    // Plus tard on utilisera un Web Service distant...
 //   this.logginService.log(assignment.nom, "modifié !");

    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignement(assignment:Assignment) :Observable<any> {
  //  let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);

//    this.logginService.log(assignment.nom, "supprimé !");


  //  return of("Assignment supprimé")
    let deleteURI = this.url + "/" + assignment._id;
    return this.http.delete(deleteURI)
  }

  peuplerBD () { 
    bdInitialAssignments.forEach( a =>  {
      let nouvelAssignement = new Assignment(); 
      nouvelAssignement.id = a.id;
      nouvelAssignement.nom = a.nom;
      nouvelAssignement.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignement.rendu = a.rendu;
      this.addAssignment(nouvelAssignement)
      .subscribe(reponse => { console.log(reponse.message)})
    } )
  }

}


