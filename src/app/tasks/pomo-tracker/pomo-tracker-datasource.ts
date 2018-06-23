import { getPomosEntitiesState } from './../reducers/index';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, concatMap, flatMap, reduce, scan, subscribeOn } from 'rxjs/operators';
import { BehaviorSubject, Observable, of as observableOf, merge } from 'rxjs';
import { Pomo } from '../../tasks/models/pomo';
export class PomoTrackerDataSource extends DataSource<Pomo> {
  sort;
  dataStream: BehaviorSubject<Pomo[]> = new BehaviorSubject<Pomo[]>([]);
  data() {
    return this.dataStream.value;
  }

  constructor(data: any[], sort: MatSort) {
    super();
    this.dataStream.next(data);
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   * @memberof PomoTrackerDataSource
  /*
   */
  connect(): Observable<Pomo[]> {
    return this.dataStream.asObservable();
  }

  disconnect() {}

}


