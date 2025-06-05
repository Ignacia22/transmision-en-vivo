import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { AdminStreamsComponent } from './streams/admin-streams/admin-streams.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    // canActivate: [AdminGuard] // Comentamos esto por ahora
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'transmisiones',
    component: AdminStreamsComponent,
    // canActivate: [AdminGuard] // Comentamos esto por ahora
  }
];