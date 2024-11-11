import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { SnackMessageService } from 'src/app/shared/services/snack-message.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.scss']
})
export class ViewVehicleComponent implements OnInit {
  vehicleForm: FormGroup;
  isEditing = false;
  vehicleId: string | null = null;
  yearToday = new Date().getFullYear();

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly vehicleService: VehicleService,
    private readonly snackMessageService: SnackMessageService,
    private readonly dialog: MatDialog
  ) {
    this.vehicleForm = this.fb.group({
      plate: ['', [Validators.required]],
      chassis: ['', [Validators.required]],
      renavam: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      model: ['', Validators.required],
      brand: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(this.yearToday)]]
    });
  }

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('id');
    if (this.vehicleId) {
      this.loadVehicle(this.vehicleId);
    }
  }

  loadVehicle(id: string): void {
    this.vehicleService.getVehicleById(id).subscribe({
      next: (vehicle: any) => {
        this.vehicleForm.patchValue(vehicle);
        this.vehicleForm.disable();
      },
      error: () => {
        this.snackMessageService.error('erro ao carregar o veículo.');
        this.router.navigate(['/vehicles']);
      }
    });
  }

  enableEditing(): void {
    this.isEditing = true;
    this.vehicleForm.enable();
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.loadVehicle(this.vehicleId!);
  }

  onUpdateVehicle(): void {
    if (this.vehicleForm.valid && this.vehicleId) {

      const updatedData: Vehicle = {
        ...this.vehicleForm.value,
        plate: this.vehicleForm.value.plate.toUpperCase(),
        chassis: this.vehicleForm.value.chassis.toUpperCase(),
        model: this.vehicleForm.value.model.toUpperCase(),
        brand: this.vehicleForm.value.brand.toUpperCase()
      };

      this.vehicleService.updateVehicle(this.vehicleId, updatedData)
        .then(() => {
          this.snackMessageService.alert('veículo atualizado com sucesso!');
          this.isEditing = false;
        })
        .catch(() => this.snackMessageService.alert('erro ao atualizar o veículo.'))
        .finally(() => this.vehicleForm.disable());
    }
  }

  onDeleteVehicle(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'excluir Veículo',
        message: 'tem certeza que deseja excluir este veículo?'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.vehicleId) {
        this.vehicleService.deleteVehicle(this.vehicleId)
          .then(() => {
            this.snackMessageService.alert('veículo excluído com sucesso!');
            this.router.navigate(['/vehicles']);
          })
          .catch(() => this.snackMessageService.error('erro ao excluir o veículo.'));
      }
    });
  }

  goToList() {
    this.router.navigate(['vehicles']);
  }
}
