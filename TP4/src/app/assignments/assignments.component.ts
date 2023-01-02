import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, merge, startWith, switchMap, of as observableOf, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})

export class AssignmentsComponent implements OnInit, AfterViewInit {
  assignments!: Assignment[];
  displayedColumns: string[] = ['nom', 'matiere', 'dateDeRendu', 'rendu'];
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource: MatTableDataSource<Assignment> = new MatTableDataSource<Assignment>();

  constructor(private assignmentsService: AssignmentsService) {

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    this.paginator.page
      .pipe(startWith({}),
        switchMap(() => {
          return this.assignmentsService.getAssignmentsPagine(
            this.paginator.pageIndex,
            this.paginator.pageSize)
        }),
        map(data => {
          this.paginator.length = data.totalDocs;
          return data.docs;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => {
        console.log("CALL API DONE");
        this.dataSource.data = data
      });
  }
}
