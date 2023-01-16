import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, merge, startWith, switchMap, of as observableOf, BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import { Router} from '@angular/router';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})

export class AssignmentsComponent implements OnInit, AfterViewInit {
  labelPosition: string = '';
  selectedValue: string = 'all';
  assignments!: Assignment[];
  filtre: number= 0;
  listeMatieres: string[] = ['Maths', 'Physique', 'Chimie', 'Anglais', 'Italien', 'BDD', 'Angular', 'Réseaux', 'Marketing'];
  displayedColumns: string[] = ['nom', 'matiere', 'dateDeRendu', 'rendu', 'button'];
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<Assignment> = new MatTableDataSource<Assignment>();

  nomFilter = new BehaviorSubject<string>('');
  matiereFilter = new BehaviorSubject<string>('');
  renduFilter = new BehaviorSubject<string>('');

  constructor(private assignmentsService: AssignmentsService, public dialog: MatDialog, 
    private _liveAnnouncer: LiveAnnouncer, private router:Router) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.loadData();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadData() {
    merge(this.sort.sortChange, this.paginator.page, this.nomFilter, this.renduFilter, this.matiereFilter)
      .pipe(startWith({}),
        switchMap(() => {
          console.log(this.renduFilter.getValue())
          return this.assignmentsService.getAssignmentsPagine(
            this.paginator.pageIndex,
            this.paginator.pageSize, 
            {
              nom: this.nomFilter.getValue(),
              matiere: this.matiereFilter.getValue(),
              rendu: this.renduFilter.getValue()
            }
            )
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.nomFilter.next(filterValue.trim());
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  radioFilter() {
    this.renduFilter.next(this.labelPosition);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dropdownFilter() {
    this.matiereFilter.next(this.selectedValue);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(assignment: any) {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { assignment }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}