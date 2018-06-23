import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PomoTableTestDataSource } from './pomo-table-test-datasource';
import { Store, select } from '@ngrx/store';
import * as fromTasks from './../tasks/reducers';

@Component({
  selector: 'app-pomo-table-test',
  templateUrl: './pomo-table-test.component.html',
  styleUrls: ['./pomo-table-test.component.css']
})
export class PomoTableTestComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PomoTableTestDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'notes'];

  constructor(public store: Store<fromTasks.State>) {}

  ngOnInit() {
    this.dataSource = new PomoTableTestDataSource(this.store, this.paginator, this.sort);
  }
}
