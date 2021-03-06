import { Component, Input } from '@angular/core';
import { Pomo } from '../models/pomo';

@Component({
  selector: 'app-pomo-detail',
  template: `
      <mat-card>
        <mat-card-title-group>
          <mat-card-title color="primary">{{ notes }}</mat-card-title>
          <mat-card-subtitle color="secondary" *ngIf="taskId">{{ taskId }}</mat-card-subtitle>
        </mat-card-title-group>
        <mat-card-content>
          <p>Due Date Goes Here</p>
        </mat-card-content>
        <mat-card-footer>
        </mat-card-footer>
      </mat-card>
  `,
  styles: [
    `
    :host {
      display: flex;
    }

    :host a {
      display: flex;
    }

    mat-card {
      width: 400px;
      margin: 15px;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
    }

    @media only screen and (max-width: 768px) {
      mat-card {
        margin: 15px 0 !important;
      }
    }
    mat-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    mat-card-title {
      margin-right: 10px;
    }
    mat-card-title-group {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    mat-card-content {
      margin-top: 15px;
      margin: 15px 0 0;
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    mat-card-footer {
      padding: 0 25px 25px;
    }
  `,
  ],
})
export class PomoDetailComponent {
  @Input() pomo: Pomo;

  get id() {
    return this.pomo.id;
  }

  get notes() {
    return this.pomo.notes;
  }

  get taskId() {
    return this.pomo.task_id;
  }

  // get description() {
  //   return this.task.due.date;
  // }

}
