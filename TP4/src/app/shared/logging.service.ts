import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(assignmentName:string, action:string) {
    console.log(`Logging service: Assignment ${assignmentName}  ${action}`);
  }

}
