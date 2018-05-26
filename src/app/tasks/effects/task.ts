import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromTasks from '../reducers';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
// import { PomoQueryService } from '../../core/services/pomo-query-service';
import { TodoistTasksService } from '../../core/services/todoist-tasks';
import {
  TaskActionTypes,
  TaskActions,
  SearchComplete,
  SearchError,
  Search,
  Select,
  LoadPomosSuccess,
  LoadPomosFail,
  AddPomo,
  AddPomoSuccess,
  AddPomoFail,
  RemovePomo,
  RemovePomoSuccess,
  RemovePomoFail
} from '../actions/task';
import {
  PomoActionTypes,
  PomoActions
} from '../actions/pomo';
import { Task } from '../models/task';
import { Pomo } from '../models/pomo';
import { defer } from 'rxjs/observable/defer';
// import { Load } from './../actions/pomo';
// import { LoadPomos } from '../actions/task';
import {
  debounceTime,
  map,
  switchMap,
  toArray,
  mergeMap,
  skip,
  takeUntil,
  filter,
  catchError,
} from 'rxjs/operators';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);

@Injectable()
export class TaskEffects {

  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('tasks_app');
  });

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<Search>(TaskActionTypes.Search),
    debounceTime(this.debounce || 10, this.scheduler || async),
    map(action => action.payload),
    switchMap(query => {
      if (query === '') {
        return empty();
      }
      const nextSearch$ = this.actions$.pipe(
        ofType(TaskActionTypes.Search),
        skip(1)
      );
      return this.todoistTaskService
        .searchTasks(query)
        .pipe(
          takeUntil(nextSearch$),
          map((tasks: Task[]) => new SearchComplete(tasks)),
          catchError(err => of(new SearchError(err)))
        );
    })
  );
  //

  @Effect()
  addPomoToTask$: Observable<Action> = this.actions$.pipe(
    ofType(TaskActionTypes.AddPomo),
    map((action: AddPomo) => action.payload),
    mergeMap(pomo =>
      this.db
        .insert('pomos', [pomo])
        .pipe(
          map(() => new AddPomoSuccess(pomo)),
          catchError(() => of(new AddPomoFail(pomo)))
        )
    )
  );

  @Effect()
  removePomoFromTask$: Observable<Action> = this.actions$.pipe(
    ofType(TaskActionTypes.RemovePomo),
    map((action: RemovePomo) => action.payload),
    mergeMap(pomo =>
      this.db
        .executeWrite('pomos', 'delete', [pomo.id])
        .pipe(
          map(() => new RemovePomoSuccess(pomo)),
          catchError(() => of(new RemovePomoFail(pomo)))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private todoistTaskService: TodoistTasksService,
    // private pomoService: PomoQueryService,
    private db: Database,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number,
    /**
     * You inject an optional Scheduler that will be undefined
     * in normal application usage, but its injected here so that you can mock out
     * during testing using the RxJS xx TestScheduler for simulating passages of time.
     */
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
  ) {}
}
