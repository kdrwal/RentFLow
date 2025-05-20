import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationpageComponent } from './reservationpage.component';

describe('ReservationpageComponent', () => {
  let component: ReservationpageComponent;
  let fixture: ComponentFixture<ReservationpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
