import { Routes } from '@angular/router';
import { ADMIN_ROUTES } from './features/admin/admin.routes';
import { MiniPlayerComponent } from './components/mini-player/mini-player.component';
import { ArchiveListComponent } from './features/streams/archive-list/archive-list.component';
import { ArchiveDetailComponent } from './features/streams/archive-detail/archive-detail.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
   { path: '', component: HomeComponent },
  { path: 'archivo', component: ArchiveListComponent },
  { path: 'archivo/:id', component: ArchiveDetailComponent },
  { 
    path: 'admin', 
    children: ADMIN_ROUTES 
  }
];
