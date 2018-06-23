import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PomoTableSortDataSource } from './pomo-table-sort-datasource';

@Component({
  selector: 'app-pomo-table-sort',
  templateUrl: './pomo-table-sort.component.html',
  styleUrls: ['./pomo-table-sort.component.css']
})
export class PomoTableSortComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PomoTableSortDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new PomoTableSortDataSource(this.paginator, this.sort);
  }
}
