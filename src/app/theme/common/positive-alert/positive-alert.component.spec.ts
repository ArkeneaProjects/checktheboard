import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiveAlertComponent } from './positive-alert.component';

describe('PositiveAlertComponent', () => {
  let component: PositiveAlertComponent;
  let fixture: ComponentFixture<PositiveAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositiveAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositiveAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
