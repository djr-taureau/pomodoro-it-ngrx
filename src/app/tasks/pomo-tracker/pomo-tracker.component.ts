import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PomoTrackerDataSource } from './pomo-tracker-datasource';
import { PomoQueryService } from '../../core/services/pomo-query-service';
import { Pomo } from '../models/pomo';
import { from as observableFrom, of as observableOf, Observable } from 'rxjs';
import { mergeScan, scan, concatMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-pomo-tracker',
  templateUrl: './pomo-tracker.component.html',
  styleUrls: ['./pomo-tracker.component.scss']
})
export class PomoTrackerComponent implements OnInit, AfterViewInit {
  // @Input() pomos$: Observable<Pomo[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PomoTrackerDataSource;
  pomos$: Observable<Pomo[]>;
  data;
  temp;

  constructor(private pomoService: PomoQueryService) {
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'notes', 'task_id'];

  ngOnInit() {
    this.pomos$ = this.pomoService.getTaskPomosNew();
    this.pomos$.subscribe(value => console.log('this is the pomos obs before going into DataSource', value));
    // TODO map JSON Objects to an ARRAY of json objects before passing it into the dataSource
    this.temp = this.pomos$.pipe(mergeMap(val => val));
    this.temp.subscribe(val => console.log('test array', val));
    this.dataSource = new PomoTrackerDataSource(this.paginator, this.sort, this.pomos$);
    this.dataSource.pomosStream.subscribe();
    this.dataSource.sort = this.sort;
    // this.dataSource.data = this.data;
    console.log('data source data?', this.dataSource.data);
  }

  ngAfterViewInit() {
   //
  }
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim();
  //   filterValue = filterValue.toLowerCase();
  //   /this.dataSource.filter = filterValue;
  // }

}
