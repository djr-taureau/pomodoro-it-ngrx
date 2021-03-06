import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-search',
  template: `
    <mat-card>
    <mat-card-title>Find a Task</mat-card-title>
      <mat-card-content>
        <form class="form" [formGroup]>
        <mat-form-field>
          <input matInput placeholder="Search for a Task" [value]="query" (keyup)="search.emit($event.target.value)">
        <mat-spinner [class.show]="searching" [diameter]="30" [strokeWidth]="3"></mat-spinner>
        </mat-form-field>
        </form>
        </mat-card-content>
      <mat-card-footer><span *ngIf="error">{{error}}</span></mat-card-footer>
    </mat-card>
  `,
  styles: [
    `
    mat-card-title,
    mat-card-content,
    mat-card-footer {
      display: flex;
      justify-content: center;
    }

    mat-card-footer {
      color: #FF0000;
      padding: 5px 0;
    }

    .mat-spinner {
      position: relative;
      top: 10px;
      left: 10px;
      opacity: 0.0;
      padding-left: 60px;
    }

    .mat-spinner.show {
      opacity: 1.0;
    }
  `,
  ],
})
export class TaskSearchComponent {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Output() search = new EventEmitter<string>();
}
