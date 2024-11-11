import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { SnackMessageService } from 'src/app/shared/services/snack-message.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  loadingVehicles: boolean = false;
  viewRegisterVehicle: boolean = false;

  constructor(
    private readonly vehicleService: VehicleService,
    private readonly snackMessageService: SnackMessageService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.loadingVehicles = true;

    this.vehicleService.getVehicles().subscribe({
      next: (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
        this.loadingVehicles = false
      },
      error: (err) => {
        this.snackMessageService.error('erro ao carregar veículos');
        this.loadingVehicles = false
      }
    });
  }

  toggleRegisterVehicle() {
    this.viewRegisterVehicle = !this.viewRegisterVehicle;
  }

  viewVehicle(id: string | undefined) {
    this.router.navigate(['vehicles', id]);
  }
}
