import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './features/admin/admin.routes';
import { MiniPlayerComponent } from './components/mini-player/mini-player.component';
import { ArchiveListComponent } from './features/streams/archive-list/archive-list.component';
import { ArchiveDetailComponent } from './features/streams/archive-detail/archive-detail.component';
import { HomeComponent } from './components/home/home.component';
import { QrGeneratorComponent } from './components/qr-generator/qr-generator.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'archivo', component: ArchiveListComponent },
  { path: 'archivo/:id', component: ArchiveDetailComponent },
  // Ruta específica para el código QR (si es una ruta en lugar de un parámetro)
  { path: 'live', component: HomeComponent, data: { autoplay: true } },
  // Si el código QR contiene algo como 'tudominio.com/live'
  { path: 'envivo', component: HomeComponent, data: { autoplay: true } }, 
  // Otras posibles rutas que podrían estar en el QR
  { path: 'generar-qr', component: QrGeneratorComponent },
  { 
    path: 'admin', 
    children: ADMIN_ROUTES 
  }
];
