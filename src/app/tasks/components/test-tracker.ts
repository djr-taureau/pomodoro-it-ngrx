
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
import * as fromTasks from '../reducers';
import * as taskPomo from '../actions/collection';

@Component({
  selector: 'app-test-tracker',
  template: `
  <table cdk-table [dataSource]="dataSource">
  <!-- Date Column -->
  <ng-container cdkColumnDef="date">
    <th cdk-header-cell *cdkHeaderCellDef> Date </th>
    <td cdk-cell *cdkCellDef="let element"> {{element.date}} </td>
  </ng-container>

  <!-- Notes Column -->
  <ng-container cdkColumnDef="notes">
    <th cdk-header-cell *cdkHeaderCellDef> Notes </th>
    <td cdk-cell *cdkCellDef="let element"> {{element.notes}} </td>
  </ng-container>

  <tr cdk-header-row *cdkHeaderRowDef="displayedColumns"></tr>
  <tr cdk-row *cdkRowDef="let row; columns: displayedColumns;"></tr>
</table>


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
export class TestTrackerComponent implements OnInit {
  @Input() dataSource;
  displayedColumns: ['date', 'notes'];
  index: number;
  id: string;
  task_id;
  date: Date;
  notes: string;
  // isPublished: boolean;
  // selectedPomoId: string;
  // pomos$: Observable<Pomo[]>;
  pomos: Pomo[];

  constructor(private store: Store<fromTasks.State>, route: ActivatedRoute) {
    // this.pomos$ = this.pomoQuery.getTaskPomos(snapshot.params.id);
    // this.pomos$.subscribe(map(pomos => this.pomos = pomos)));
    //
  }

  ngOnInit() {
   //
  }





}


