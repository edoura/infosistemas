import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly apiUrl = 'https://us-central1-infosistemas-2024.cloudfunctions.net';

  constructor(private readonly http: HttpClient) { }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/createVehicle`, vehicle);
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/getVehicles`);
  }
}
