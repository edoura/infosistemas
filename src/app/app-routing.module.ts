import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';

const routes: Routes = [
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'vehicles/:id', component: ViewVehicleComponent },
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
