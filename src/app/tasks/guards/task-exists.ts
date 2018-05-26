import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { filter, take, map, tap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { TodoistTasksService } from '../../core/services/todoist-tasks';
import * as fromTasks from '../reducers';
import * as task from '../actions/task';

@Injectable()
export class TaskExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromTasks.State>,
    private todoistTaskService: TodoistTasksService,
    private router: Router
  ) {}


  waitForCollectionToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromTasks.getCollectionLoaded),
      filter(loaded => loaded),
      take(1)
    );
  }


  hasTaskInStore(id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromTasks.getTaskEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }

  hasTaskInApi(id: string): Observable<boolean> {
    return this.todoistTaskService.retrieveTask(id).pipe(
      map(taskEntity => new task.Load(taskEntity)),
      tap((action: task.Load) => this.store.dispatch(action)),
      map(t => !!t),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  hasTask(id: string): Observable<boolean> {
    return this.hasTaskInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        return this.hasTaskInApi(id);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCollectionToLoad().pipe(
      switchMap(() => this.hasTask(route.params['id']))
    );
  }
}
