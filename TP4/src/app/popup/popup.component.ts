import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentsComponent } from '../assignments/assignments.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  title!: string;
  content!: string;
  yesNo!: boolean;
  yes: string = 'Yes';
  no: string = 'No';
  assignment!: any;

  constructor(
    public dialogRef: MatDialogRef<AssignmentsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.assignment = this.data.assignment;
  }

  onClick(state: string): void {
    this.dialogRef.close(state);
  }
}
