import { Component, OnInit, ViewChild, Input, AfterViewInit, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PomoTrackerDataSource } from './pomo-tracker-datasource';
import { Pomo } from '../models/pomo';
import { from as observableFrom, of as observableOf, Observable } from 'rxjs';
import { mergeScan, scan, concatMap, mergeMap, flatMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromTasks from '../reducers';
import * as fromPomos from '../reducers';
import * as collection from '../actions/collection';
@Component({
  selector: 'app-pomo-tracker',
  templateUrl: './pomo-tracker.component.html',
  styleUrls: ['./pomo-tracker.component.scss']
})
export class PomoTrackerComponent implements OnInit, AfterViewInit {

  dataSource: PomoTrackerDataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  renderedData: Pomo[];

  constructor(public store: Store<fromTasks.State>) { }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'notes'];

  ngOnInit() {
    this.store.dispatch(new collection.LoadPomos());
    this.store.select(fromPomos.getPomosTask).subscribe(arr => {
      this.dataSource = new PomoTrackerDataSource(arr, this.sort, this.paginator);
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.active = 'date';
    this.sort.direction = 'desc';
    // this.dataSource.connect().subscribe(d => this.renderedData = d);
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    this.store.select(fromPomos.getPomosTask).subscribe(arr => {
      this.dataSource.data = arr;
    });
  }


}
