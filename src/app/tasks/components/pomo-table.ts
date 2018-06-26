import { Component, OnInit, ViewChild, Input, AfterViewInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Pomo } from '../models/pomo';
import { from as observableFrom, of as observableOf, Observable } from 'rxjs';
import { mergeScan, scan, concatMap, mergeMap, flatMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromTasks from '../reducers';
import * as fromPomos from '../reducers';
import * as collection from '../actions/collection';

@Component({
  selector: 'app-pomo-table',
  template: `
  <div class="mat-elevation-z8">
  <mat-table #table [dataSource]="this.pomos$ | async" matSort aria-label="Pomos">

    <!-- Date Column -->
    <ng-container matColumnDef="date">
      <mat-header-cell *matHeaderCellDef mat-sort-header>Date</mat-header-cell>
      <mat-cell *matCellDef="let row">{{row.date | date: 'short'}}</mat-cell>
    </ng-container>

    <!-- Notes Column -->
    <ng-container matColumnDef="notes">
      <mat-header-cell *matHeaderCellDef mat-sort-header>Notes</mat-header-cell>
      <mat-cell *matCellDef="let row">{{row.notes}}</mat-cell>
    </ng-container>

    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
  </mat-table>

  <mat-paginator #paginator
    [length]="dataSource.data.length"
    [pageIndex]="0"
    [pageSize]="50"
    [pageSizeOptions]="[25, 50, 100, 250]">
  </mat-paginator>
</div>
  `,
  styles: [
    `
    :host {
      display: flex;
    }

    :host a {
      display: flex;
    }

    mat-card {
      width: 400px;
      margin: 15px;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
    }

    @media only screen and (max-width: 768px) {
      mat-card {
        margin: 15px 0 !important;
      }
    }
    mat-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    mat-card-title {
      margin-right: 10px;
    }
    mat-card-title-group {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    mat-card-content {
      margin-top: 15px;
      margin: 15px 0 0;
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    mat-card-footer {
      padding: 0 25px 25px;
    }
  `,
  ],
})
export class PomoTableComponent implements OnInit {
  @Input() pomos$: Observable<Pomo[]>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  renderedData: Pomo[];
  displayedColumns = ['date', 'notes'];

ngOnInit() {
  //
}
}
