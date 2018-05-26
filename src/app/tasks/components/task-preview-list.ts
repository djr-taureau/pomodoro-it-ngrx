import { Component, Input } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-preview-list',
  template: `
    <app-task-preview *ngFor="let task of tasks" [task]="task"></app-task-preview>
  `,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
  ],
})
export class TaskPreviewListComponent {
  @Input() tasks: Task[];
}
