import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { MiniPlayerComponent } from './components/mini-player/mini-player.component';
import { FullPlayerModalComponent } from './components/full-player-modal/full-player-modal.component';
import { StreamService } from './core/services/stream.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    FullPlayerModalComponent, 
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'transmision-en-vivo-app';

  constructor (
    private route: ActivatedRoute,
    private streamService: StreamService
  ) {}

  ngOnInit() {
    // Verificar parámetros de URL o ruta específica del código QR
    this.route.queryParams.subscribe(params => {
      // Verifica si hay un parámetro específico en la URL
      // Por ejemplo: ?stream=live o ?qr=true o el parámetro que el QR incluya
      if (params['stream'] === 'live' || params['qr'] === 'true' || params['autoplay'] === 'true') {
        // Abrir automáticamente el reproductor a pantalla completa
        setTimeout(() => {
          this.streamService.showFullPlayer();
        }, 1000); // Pequeño retraso para asegurar que todo se cargue
      }
    });
  }
}
