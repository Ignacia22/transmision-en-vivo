import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './features/admin/admin.routes';
import { MiniPlayerComponent } from './components/mini-player/mini-player.component';

export const routes: Routes = [
    { path: '', component: MiniPlayerComponent },
  { 
    path: 'admin', 
    children: ADMIN_ROUTES 
  }
];
