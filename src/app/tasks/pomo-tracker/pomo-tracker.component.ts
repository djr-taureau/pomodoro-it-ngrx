import { Component, OnInit, ViewChild,
        Input, Output, AfterViewInit, EventEmitter,
        ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PomoTimerService } from './../../core/services/pomo-timer';
import { PomoTrackerDataSource } from './pomo-tracker-datasource';
import { Pomo } from '../models/pomo';
import { from as observableFrom, of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { mergeScan, scan, concatMap, mergeMap, flatMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromTasks from '../reducers';
import * as fromPomos from '../reducers';
import * as collection from '../actions/collection';
import * as taskPomo from '../actions/task';

@Component({
  selector: 'app-pomo-tracker',
  templateUrl: './pomo-tracker.component.html',
  styleUrls: ['./pomo-tracker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PomoTrackerComponent implements OnInit, AfterViewInit {
  dataSource: PomoTrackerDataSource;
  @Input() pomos$: Observable<Pomo[]>;
  @Input() addPomo: EventEmitter<Pomo>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() pomoEmitter = new EventEmitter<Pomo>();
  pomos: Pomo[];
  pomosStream$;

  constructor(public store: Store<fromTasks.State>, private cd: ChangeDetectorRef) {
    this.cd.markForCheck();
   }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered.   */
  displayedColumns = ['date', 'notes'];

  ngOnInit() {

    // this.store.dispatch(new collection.LoadPomos());
    // this.store.select(fromPomos.getPomosTask).subscribe(arr => {
    //   this.dataSource = new PomoTrackerDataSource(arr, this.sort, this.paginator);
    // });
    this.pomos$.subscribe(arr => {
      this.pomos = arr;
      this.dataSource = new PomoTrackerDataSource(this.pomos, this.sort, this.paginator);
    });
    // this.dataSource = new PomoTrackerDataSource(this.pomos$, this.sort, this.paginator);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.active = 'date';
    this.sort.direction = 'desc';
    // this.pomosStream$ = this.pomos;
    // this.pomosStream$.subscribe(pomos => {
    //   this.pomos = [...this.pomos, ...pomo]
    // });
    // console.log('timer source', this.timerSource);
    // this.dataSource.connect().subscribe(d => this.renderedData = d);
  }
  addPomoToTask(pomo: Pomo) {
    console.log('this pomo has been added', pomo);
    console.log('is this being called');
    // this.store.dispatch(new taskPomo.AddPomo(pomo));
    // this.dataSource = new PomoTrackerDataSource(this.pomos, this.sort, this.paginator);
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.store.select(fromPomos.getPomosTask).subscribe(arr => {
    //   this.dataSource.data = arr;
    // });

  }

}
