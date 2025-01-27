import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalRequestsComponent } from './hospital-requests.component';

describe('HospitalRequestsComponent', () => {
  let component: HospitalRequestsComponent;
  let fixture: ComponentFixture<HospitalRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
