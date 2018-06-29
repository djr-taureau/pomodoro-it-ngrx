import { Component, OnInit, ViewChild,
        Input, AfterViewInit, EventEmitter,
        ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PomoTimerService } from './../../core/services/pomo-timer';
import { PomoTrackerDataSource } from './pomo-tracker-datasource';
import { Pomo } from '../models/pomo';
import { from as observableFrom, of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { mergeScan, scan, concatMap, mergeMap, flatMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromTasks from '../reducers';
import * as fromPomos from '../reducers';
import * as collection from '../actions/collection';
@Component({
  selector: 'app-pomo-tracker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="mat-elevation-z8">
  <mat-table #table [dataSource]="dataSource" matSort aria-label="Pomos">

    <!-- Date Column -->
    <ng-container matColumnDef="date">
      <mat-header-cell *matHeaderCellDef mat-sort-header>Date</mat-header-cell>
      <mat-cell *matCellDef="let row">{{row.date | date: 'short'}}</mat-cell>
    </ng-container>

    <!-- Notes Column     -->
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
    [pageSize]="5"
    [pageSizeOptions]="[5, 10, 30, 40]">
  </mat-paginator>
</div>

  `,
  styles: [
   `
   :host {
    display: flex;
    justify-content: center;
    margin: 75px 0;
  }


  .container {
    display: flex;
    flex-direction: column;
    max-width: 500px;
  }

  .mat-cell {
    font-size: 14px;
    width: 80%;
    padding: 20px, 0, 0, 20px;
  }

  .header {
    min-height: 64px;
    padding: 8px 24px 0;
  }

  .mat-header-cell.mat-sort-header-sorted {
    color: black;
    align-items: center;
  }

   `
  ],
})
export class PomoTrackerComponent implements OnInit, AfterViewInit {

  @Input() pomos: Pomo[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: PomoTrackerDataSource;
  renderedData: Pomo[];
  pomosStream$;

  constructor(public store: Store<fromTasks.State>, private cd: ChangeDetectorRef) {
   }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'notes'];

  ngOnInit() {
    this.dataSource = new PomoTrackerDataSource(this.pomos, this.sort, this.paginator);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.active = 'date';
    this.sort.direction = 'desc';
  }

  addPomoToTask(pomo: Pomo) {
    console.log('this pomo has been added', pomo);
    this.store.select(fromPomos.getSelectedTaskPomos).subscribe(arr => {
    this.dataSource = new PomoTrackerDataSource(arr, this.sort, this.paginator);
    });
    // this.dataSource = new PomoTrackerDataSource(this.pomos, this.sort, this.paginator);
  }

  addPomo($event) {
    this.dataSource.addPomo($event);
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.store.select(fromPomos.getPomosTask).subscribe(arr => {
    //   this.dataSource.data = arr;
    // });
  }

}
