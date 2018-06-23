
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomoTableSortComponent } from './pomo-table-sort.component';

describe('PomoTableSortComponent', () => {
  let component: PomoTableSortComponent;
  let fixture: ComponentFixture<PomoTableSortComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PomoTableSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomoTableSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
