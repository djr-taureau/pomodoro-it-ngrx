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
  @Input() pomosStream;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PomoTrackerDataSource;
  dataPomos$: Observable<Pomo[]>;

  constructor(private pomoService: PomoQueryService) {
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'notes', 'task_id'];

  ngOnInit() {
    this.dataPomos$ = this.pomoService.getTaskPomosNew();
    this.dataSource = new PomoTrackerDataSource(this.paginator, this.sort, this.dataPomos$);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
