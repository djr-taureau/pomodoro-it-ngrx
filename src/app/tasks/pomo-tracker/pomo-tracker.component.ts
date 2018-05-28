import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PomoTrackerDataSource } from './pomo-tracker-datasource';
import { PomoQueryService } from '../../core/services/pomo-query-service';
import { Pomo } from '../models/pomo';

@Component({
  selector: 'app-pomo-tracker',
  templateUrl: './pomo-tracker.component.html',
  styleUrls: ['./pomo-tracker.component.css']
})
export class PomoTrackerComponent implements OnInit {
  // @Input() pomos$: Observable<Pomo[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PomoTrackerDataSource;
  pomos$: Observable<Pomo[]>;

  constructor(private pomoService: PomoQueryService) {
    this.pomos$ = this.pomoService.getTaskPomos();
  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'notes', 'task_id'];

  ngOnInit() {
    this.dataSource = new PomoTrackerDataSource(this.paginator, this.sort, this.pomos$);
    this.dataSource.loadPomos();
    console.log('datasource data', this.dataSource.data);
  }
}
