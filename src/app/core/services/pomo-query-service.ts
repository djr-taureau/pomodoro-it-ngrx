import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { defer } from 'rxjs';
import { Pomo } from './../../tasks/models/pomo';
import { Database } from '@ngrx/db';

@Injectable({
  providedIn: 'root'
})
export class PomoQueryService {

  pomos$: Observable<Pomo[]>;

  openDB$: Observable<any> = defer(() => {
    return this.db.open('tasks_app');
  });

  constructor(private db: Database) {}

   getTaskPomos(id: string): Observable<Pomo[]> {
     return this.db.query('pomos').filter((p: Pomo) => id === p.task_id.toString());
    }

    getTaskPomos_test(id: string) {
      return this.db.query('pomos').filter((p: Pomo) => id === p.task_id.toString());
     }

}







