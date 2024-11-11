import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackMessageService } from 'src/app/shared/services/snack-message.service';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.scss']
})
export class RegisterVehicleComponent {
  vehicleForm: FormGroup;
  loadingRegister: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly vehicleService: VehicleService,
    private readonly snackMessageService: SnackMessageService
  ) {
    this.vehicleForm = this.fb.group({
      plate: ['', [Validators.required]],
      chassis: ['', [Validators.required]],
      renavam: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      model: ['', Validators.required],
      brand: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(2024)]]
    });
  }

  onSubmit(): void {
    this.loadingRegister = true;

    if (this.vehicleForm.valid) {

      const vehicle: Vehicle = {
        ...this.vehicleForm.value,
        plate: this.vehicleForm.value.plate.toUpperCase(),
        chassis: this.vehicleForm.value.chassis.toUpperCase(),
        model: this.vehicleForm.value.model.toUpperCase(),
        brand: this.vehicleForm.value.brand.toUpperCase()
      };

      this.vehicleService.createVehicle(vehicle).subscribe({
        next: () => {
          this.snackMessageService.alert('Veículo cadastrado com sucesso!');
        },
        error: () => {
          this.snackMessageService.error('Erro ao cadastrar veículo');
          this.loadingRegister = false;
        },
        complete: () => {
          this.loadingRegister = false

          this.vehicleForm.reset();
          this.resetFormState();
        }
      })
    }
  }

  private resetFormState(): void {
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
