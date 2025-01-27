import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRepsComponent } from './sales-reps.component';

describe('SalesRepsComponent', () => {
  let component: SalesRepsComponent;
  let fixture: ComponentFixture<SalesRepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesRepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesRepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
