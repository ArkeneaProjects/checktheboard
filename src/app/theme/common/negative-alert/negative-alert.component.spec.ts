import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegativeAlertComponent } from './negative-alert.component';

describe('NegativeAlertComponent', () => {
  let component: NegativeAlertComponent;
  let fixture: ComponentFixture<NegativeAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NegativeAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegativeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
