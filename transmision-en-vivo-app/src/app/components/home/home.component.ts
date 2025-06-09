import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MiniPlayerComponent } from '../mini-player/mini-player.component';
import { StreamService } from '../../core/services/stream.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MiniPlayerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private streamService: StreamService
  ) {}

  ngOnInit() {
    // Verificar parámetros de URL para autoplay
    this.route.queryParams.subscribe(params => {
      if (params['stream'] === 'live' || params['qr'] === 'true' || params['autoplay'] === 'true') {
        // Abrir automáticamente el reproductor a pantalla completa
        setTimeout(() => {
          this.streamService.showFullPlayer();
        }, 1000); // Pequeño retraso para asegurar que todo se cargue
      }
    });

    // También verificar si hay data de ruta para autoplay
    this.route.data.subscribe(data => {
      if (data['autoplay']) {
        setTimeout(() => {
          this.streamService.showFullPlayer();
        }, 1000);
      }
    });
  }
}
