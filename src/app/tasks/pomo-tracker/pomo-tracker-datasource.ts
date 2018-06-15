import { PomoQueryService } from '../../core/services/pomo-query-service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, concatMap, flatMap, reduce, scan } from 'rxjs/operators';
import { BehaviorSubject, Observable, of as observableOf, merge } from 'rxjs';
import { Pomo } from '../../tasks/models/pomo';


// const POMO_DATA: pomoDataSource;

export class PomoTrackerDataSource extends DataSource<Pomo> {
  data;
  test;
  pomos$: Observable<Pomo[]>;
  public pomosStream: BehaviorSubject<Pomo[]> = new BehaviorSubject<Pomo[]>([]);
  constructor(public paginator: MatPaginator, public sort: MatSort, private dataPomos$: Observable<Pomo[]>) {
    super();
   //
    // this.test = observableOf(this.dataPomos$)
    //   .flatMap()
    // this.test.subscribe(data => {
    //   console.log(val)
    // }
    this.pomos$ = this.dataPomos$;
    this.data = this.pomos$.pipe(
      flatMap(value => observableOf(this.pomosStream))
      ).subscribe(value => console.log('is this an array', value));
  }

    //   this.pomos$ = this.pomos$.pipe(
    //   scan((acc: Pomo[], value) => {
    //     acc.push(...value);
    //     return acc;
    //   })
    // );
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Pomo[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    // const dataMutations = [
    //    observableOf(this.data),
    //       this.paginator.page,
    //       this.sort.sortChange
    //    ];

    // Set the paginators length
    // this.paginator.length = this.data.length;
    // this.dataPomos$.subscribe(result => this.paginator.length = result.length);

    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getPagedData(this.getSortedData([...this.data]));
    //  }));
    return this.pomos$;

  }

  disconnect() {}


  // loadPomos() {
  //   this.pomosStream.subscribe();
  // }

  private getPagedData(data: Pomo[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }


  private getSortedData(data: Pomo[]) {
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
