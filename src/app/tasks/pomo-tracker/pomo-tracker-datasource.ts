import { getPomosEntitiesState } from './../reducers/index';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, concatMap, flatMap, reduce, scan, subscribeOn } from 'rxjs/operators';
import { BehaviorSubject, Observable, of as observableOf, merge } from 'rxjs';
import { Pomo } from '../../tasks/models/pomo';
export class PomoTrackerDataSource extends DataSource<Pomo> {

  // public pomosStream: BehaviorSubject<Pomo[]> = new BehaviorSubject<Pomo[]>([]);
  // filter;
  data;
  // set data(v: Pomo[]) { this.pomosStream.next(v); }
  // get data(): Pomo[] { return this.pomosStream.value; }

  constructor(public paginator: MatPaginator, public sort: MatSort, public dataBase: any) {
    super();
    this.data = this.dataBase;
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   * @memberof PomoTrackerDataSource
  /*
   */
  connect(): Observable<Pomo[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.

    const displayDataChanges = [
      this.data,
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...displayDataChanges).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
     }));
    // return this.pomosStream.asObservable();

  }

  disconnect() {
    // this.pomosStream.complete();
  }

  private getPagedData(data: Pomo[]): Pomo[] {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Pomo[]): Pomo[] {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'notes': return compare(a.notes, b.notes, isAsc);
        case 'date': return compare(+a.date, +b.date, isAsc);
        case 'task_id': return compare(+a.task_id, +b.task_id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
