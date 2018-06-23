
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomoTableComponent } from './pomo-table.component';

describe('PomoTableComponent', () => {
  let component: PomoTableComponent;
  let fixture: ComponentFixture<PomoTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PomoTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
