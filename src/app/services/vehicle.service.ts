import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model'; // Defina o seu modelo de veículo

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private readonly collectionName = 'vehicles';

  constructor(private readonly firestore: AngularFirestore) { }

  // Método para obter todos os veículos
  getVehicles(): Observable<Vehicle[]> {
    return this.firestore.collection<Vehicle>(this.collectionName).valueChanges({ idField: 'id' });
  }

  // Método para obter um veículo por ID
  getVehicleById(id: string): Observable<Vehicle | undefined> {
    return this.firestore.collection<Vehicle>(this.collectionName).doc(id).valueChanges();
  }

  // Método para adicionar um novo veículo
  addVehicle(vehicle: Vehicle): Promise<any> {
    return this.firestore.collection(this.collectionName).add(vehicle);
  }

  // Método para atualizar um veículo existente
  updateVehicle(id: string, vehicle: Vehicle): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(vehicle);
  }

  // Método para deletar um veículo
  deleteVehicle(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
