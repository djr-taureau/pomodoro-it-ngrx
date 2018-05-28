
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomoTrackerComponent } from './pomo-tracker.component';

describe('PomoTrackerComponent', () => {
  let component: PomoTrackerComponent;
  let fixture: ComponentFixture<PomoTrackerComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PomoTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomoTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
