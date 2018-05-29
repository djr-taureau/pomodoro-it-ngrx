import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PomoTrackerDataSource } from './pomo-tracker-datasource';
import { PomoQueryService } from '../../core/services/pomo-query-service';
import { Pomo } from '../models/pomo';

@Component({
  selector: 'app-pomo-tracker',
  templateUrl: './pomo-tracker.component.html',
  styleUrls: ['./pomo-tracker.component.css']
})
export class PomoTrackerComponent implements AfterViewInit {
  // @Input() pomos$: Observable<Pomo[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  // pomos$: Observable<Pomo[]>;

  constructor(private pomoService: PomoQueryService) {
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'notes', 'task_id'];

  ngAfterViewInit() {
    this.pomoService.getTaskPomos().pipe().subscribe(data => {
      console.log('this is the data', data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
