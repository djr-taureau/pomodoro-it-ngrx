import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
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
  @Input() pomos$: Observable<Pomo[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource;
  pomosDatabase: Pomo[] = [];
  pomosData: Array<Pomo> = [];

  constructor(public store: Store<fromTasks.State>) {
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'notes', 'task_id'];

  ngOnInit() {

    // this.loadData();
    this.store.dispatch(new collection.LoadPomos());
    this.store.select(fromPomos.getPomosTask).subscribe(arr => {
      this.pomosDatabase = arr;
      console.log('wthe fuck', arr);
    });
    this.dataSource = new PomoTrackerDataSource(this.paginator, this.sort, this.pomosDatabase);
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
