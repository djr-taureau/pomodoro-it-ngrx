import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import * as fromTasks from '../reducers';
import * as task from '../actions/task';
import * as pomoTasks from '../actions/collection';

@Component({
  selector: 'bc-view-task-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-selected-task-page></bc-selected-task-page>
  `,
})
export class ViewTaskPageComponent implements OnDestroy {
  actionsSubscription: Subscription;
  pomosSubscription: Subscription;

  constructor(store: Store<fromTasks.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new task.Select(params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
