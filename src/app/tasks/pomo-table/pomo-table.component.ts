import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PomoTableDataSource } from './pomo-table-datasource';

@Component({
  selector: 'app-pomo-table',
  templateUrl: './pomo-table.component.html',
  styleUrls: ['./pomo-table.component.css']
})
export class PomoTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PomoTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new PomoTableDataSource(this.paginator, this.sort);
  }
}
