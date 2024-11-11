import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVehicleComponent } from './register-vehicle.component';

describe('RegisterVehicleComponent', () => {
  let component: RegisterVehicleComponent;
  let fixture: ComponentFixture<RegisterVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterVehicleComponent]
    });
    fixture = TestBed.createComponent(RegisterVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
