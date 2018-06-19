import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromTasks from '../reducers';
import * as pomos from '../actions/pomo';
import * as collection from '../actions/collection';
import { Task } from '../models/task';

@Component({
  selector: 'app-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>My Pomodo-it Tasks</mat-card-title>
    </mat-card>

    <app-task-preview-list [tasks]="tasks$ | async"></app-task-preview-list>
  `,
  styles: [
    `
    mat-card-title {
      display: flex;
      justify-content: center;
    }
  `,
  ],
})
export class CollectionPageComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private store: Store<fromTasks.State>) {
    this.tasks$ = store.pipe(select(fromTasks.getTaskCollection));
  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
    this.store.dispatch(new collection.LoadPomos());
  }
}
