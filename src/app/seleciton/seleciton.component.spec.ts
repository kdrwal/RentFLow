import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecitonComponent } from './seleciton.component';

describe('SelecitonComponent', () => {
  let component: SelecitonComponent;
  let fixture: ComponentFixture<SelecitonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecitonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecitonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
