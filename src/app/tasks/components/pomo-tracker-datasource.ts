import { getPomosEntitiesState } from './../reducers/index';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, concatMap, flatMap, reduce, scan, subscribeOn } from 'rxjs/operators';
import { BehaviorSubject, Observable, of as observableOf, merge } from 'rxjs';
import { Pomo } from '../../tasks/models/pomo';
export class PomoTrackerDataSource extends DataSource<Pomo> {
  sort;
  paginator;

  dataStream: BehaviorSubject<Pomo[]> = new BehaviorSubject<Pomo[]>([]);
  set data(v: Pomo[]) { this.dataStream.next(v); }
  get data(): Pomo[] { return this.dataStream.value; }
  // data() {
  //   return this.dataStream.value;
  // }

  constructor(data: Pomo[], sort: MatSort, paginator: MatPaginator) {
    super();
    this.dataStream.next(data);
    // this.data = this.dataStream.next(data);
  }
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   * @memberof PomoTrackerDataSource
  /*
   */
  connect(): Observable<Pomo[]> {

    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
    // return this.dataStream.asObservable();
  }

  disconnect() {
    this.dataStream.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Pomo[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Pomo[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'notes': return compare(+a.notes, +b.notes, isAsc);
        default: return 0;
      }
    });
  }

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
