
import { LoadPomos } from './../actions/task';
import { PomoQueryService } from '../../core/services/pomo-query-service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { Pomo } from '../models/pomo';
import {MatTableDataSource} from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, concatMap  } from 'rxjs/operators';
// import 'rxjs/add/obserable/of';
// import { DataSource } from '@angular/cdk/collections';
import * as fromTasks from '../reducers';
import * as taskPomo from '../actions/collection';
// import { LoadPomos } from '../actions/task';


@Component({
  selector: 'bc-pomo-tracker',
  template: `
    <div class="mdl-cell mdl-cell--6-col">
      <div class="pomo-container mat-elevation-z8">
        <div class="pomo-header">
        <mat-list><mat-list-item>This is for the pomos: WHERE ARE THEY</mat-list-item></mat-list>
        <mat-list *ngFor="let pomo of pomos | async">
          <mat-list-item>{{ pomo.notes }}</mat-list-item>
        </mat-list>
        </div>
    </div>
  </div>


  `,
  styles: [
    `
    :host {
      display: flex;
      justify-content: center;
      margin: 75px 0;
    }
    .pomo-container {
      display: center;
      flex-direction: column;
      min-width: 700px;
      max-width: 700px;
    }
    .pomo-header {
      min-height: 64px;
      padding: 8px 24px 0;
    }
    .mat-form-field {
      font-size: 14px;
      width: 100%;
    }
    .mat-table {
      overflow: auto;
      max-height: 300px;
    }

  `,
  ],
})
export class PomoTrackerComponent implements OnInit {
  // @Input() pomos: Pomo[];
  index: number;
  id: string;
  task_id;
  date: Date;
  notes: string;
  // isPublished: boolean;
  // selectedPomoId: string;
  pomos$: Observable<Pomo[]>;
  pomos: Pomo[];

  constructor(private store: Store<fromTasks.State>, route: ActivatedRoute, private pomoQuery: PomoQueryService) {
    const snapshot = route.snapshot;
    this.pomos$ = this.pomoQuery.getTaskPomos(snapshot.params.id);
    // this.pomos$.pipe(map(pomos => this.pomos = pomos));
    this.pomos$.subscribe(pomos => console.log('these are the pomos from pomoTracker', pomos));
    this.pomos$.pipe(map((pomos: Pomo[]) => this.pomos = pomos));
    console.log('are the pomos working', this.pomos);
    // this.pomos$.pipe(
    //   map((pomos: Pomo[]) => this.pomosArray));
    // console.log('this is the pomos aray', this.pomosArray);
  }

  ngOnInit() {
   //
   // this.pomos$.pipe(concatMap(pomos => this.pomos = pomos));
  }

  getPomos () {
   //
  }




}


