import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeTableComponent } from './bike-table.component';

describe('BikeTableComponent', () => {
  let component: BikeTableComponent;
  let fixture: ComponentFixture<BikeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BikeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
