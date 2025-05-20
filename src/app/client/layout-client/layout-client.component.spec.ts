import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutClientComponent } from './layout-client.component';

describe('LayoutClientComponent', () => {
  let component: LayoutClientComponent;
  let fixture: ComponentFixture<LayoutClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
