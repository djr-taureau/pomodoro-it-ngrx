import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PomoTrackerDataSource } from './pomo-tracker-datasource';
import { PomoQueryService } from '../../core/services/pomo-query-service';
import { Pomo } from '../models/pomo';

@Component({
  selector: 'app-pomo-tracker',
  templateUrl: './pomo-tracker.component.html',
  styleUrls: ['./pomo-tracker.component.scss']
})
export class PomoTrackerComponent implements AfterViewInit {
  // @Input() pomos$: Observable<Pomo[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  pomos$: Observable<Pomo[]>;
  pomos: Pomo[];

  constructor(private pomoService: PomoQueryService) {
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'notes', 'task_id'];

  ngAfterViewInit() {
    this.pomos$ = this.pomoService.getTaskPomosNew();
    this.pomos$.pipe().subscribe(data => {
      console.log('this is the data', data);
      this.dataSource = ([{id: 23232, date: '4-3-12'}]);
      console.log(this.dataSource);
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
