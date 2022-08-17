import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LentCalcComponent } from './lent-calc.component';

describe('LentCalcComponent', () => {
  let component: LentCalcComponent;
  let fixture: ComponentFixture<LentCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LentCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LentCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
