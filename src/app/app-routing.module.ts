import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComponent } from './pages/historial/historial.component';
import { HomeComponent } from './pages/home/home.component';
import { TransferirComponent } from './pages/transferir/transferir.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'transferir', component: TransferirComponent },
  { path: 'historial', component: HistorialComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
