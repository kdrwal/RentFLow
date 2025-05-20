import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationbikeComponent } from './reservationbike.component';

describe('ReservationbikeComponent', () => {
  let component: ReservationbikeComponent;
  let fixture: ComponentFixture<ReservationbikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationbikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationbikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
