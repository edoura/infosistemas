import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/models/vehicle.model';

@Component({
  selector: 'app-vehicle-inputs',
  templateUrl: './vehicle-inputs.component.html',
  styleUrls: ['./vehicle-inputs.component.scss']
})
export class VehicleInputsComponent implements OnInit {
  @Input() vehicleForm: FormGroup;
  yearToday = new Date().getFullYear();

  @Output() vehicleSubmit = new EventEmitter<Vehicle>();
  @Output() formReady = new EventEmitter<FormGroup>();

  constructor(private readonly fb: FormBuilder) {
    this.vehicleForm = this.fb.group({
      plate: ['', [Validators.required]],
      chassis: ['', [Validators.required]],
      renavam: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      model: ['', Validators.required],
      brand: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(1900), Validators.max(this.yearToday)]]
    });
  }

  ngOnInit(): void {
    this.formReady.emit(this.vehicleForm);
  }

  getFormGroup(): FormGroup {
    return this.vehicleForm;
  }

  prepareAndEmit(): void {
    if (this.vehicleForm.valid) {
      const vehicle: Vehicle = {
        ...this.vehicleForm.value,
        plate: this.vehicleForm.value.plate.toUpperCase(),
        chassis: this.vehicleForm.value.chassis.toUpperCase(),
        model: this.vehicleForm.value.model.toUpperCase(),
        brand: this.vehicleForm.value.brand.toUpperCase()
      };
      this.vehicleSubmit.emit(vehicle);
    }
  }

  resetFormState(): void {
    this.vehicleForm.reset();
    Object.keys(this.vehicleForm.controls).forEach(key => {
      const control = this.vehicleForm.get(key);
      if (control) {
        control.markAsPristine();
        control.markAsUntouched();
        control.setErrors(null);
      }
    });
  }
}
