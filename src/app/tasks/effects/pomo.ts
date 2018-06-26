
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import {
  CollectionActionTypes,
  CollectionActions,
  LoadPomos,
  LoadPomosSuccess,
  LoadPomosFail
} from '../actions/collection';
import {
  PomoActionTypes,
  PomoActions,
  Load,
  LoadSuccess,
  LoadFail
} from '../actions/pomo';
import { Pomo } from '../models/pomo';
import { getSelectedTaskId } from '../reducers/index';
import {
  debounceTime,
  map,
  switchMap,
  skip,
  takeUntil,
  catchError,
  toArray
} from 'rxjs/operators';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);

@Injectable()
export class PomoEffects {
  @Effect()
  loadPomos$: Observable<Action> = this.actions$.pipe(
    ofType(CollectionActionTypes.LoadPomos),
    switchMap(() =>
      this.db
        .query('pomos')
        .pipe(
          toArray(),
          map((pomos: Pomo[]) => new LoadSuccess(pomos)),
          catchError(error => of(new LoadFail(error)))
        )
    )
  );


  constructor(
    private actions$: Actions,
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
