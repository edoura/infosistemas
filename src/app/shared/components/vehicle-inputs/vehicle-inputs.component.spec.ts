import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInputsComponent } from './vehicle-inputs.component';

describe('VehicleFormComponent', () => {
  let component: VehicleInputsComponent;
  let fixture: ComponentFixture<VehicleInputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleInputsComponent]
    });
    fixture = TestBed.createComponent(VehicleInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
