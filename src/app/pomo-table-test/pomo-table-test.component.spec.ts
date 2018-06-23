
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomoTableTestComponent } from './pomo-table-test.component';

describe('PomoTableTestComponent', () => {
  let component: PomoTableTestComponent;
  let fixture: ComponentFixture<PomoTableTestComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PomoTableTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomoTableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
