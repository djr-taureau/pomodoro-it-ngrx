import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { defer } from 'rxjs';
import { filter, map, toArray } from 'rxjs/operators';
import { Pomo } from './../../tasks/models/pomo';
import { Database } from '@ngrx/db';

@Injectable({
  providedIn: 'root'
})
export class PomoQueryService {

  pomos$: Observable<Pomo[]>;
  pomosInner: any = [];

  openDB$: Observable<any> = defer(() => {
    return this.db.open('tasks_app');
  });

  constructor(private db: Database) {}

   getTaskPomosTest(id: string): Observable<Pomo[]> {
     return this.db.query('pomos').pipe(
       filter(p => id === p.task_id.toString()),
       map((p: Pomo) => [p])
     );
    }

    getTaskPomos() {
      return this.db.query('pomos');
     }

    //  getTaskPomosNew(): Observable<Pomo[]> {
    //   return this.db.query('pomos').pipe(map((p: Pomo) => [p]));
    //  }

     getTaskPomosNew(): Observable<Pomo[]> {
      return this.db.query('pomos');
     }

     // filter((p: Pomo) => id === p.task_id.toString());

}







