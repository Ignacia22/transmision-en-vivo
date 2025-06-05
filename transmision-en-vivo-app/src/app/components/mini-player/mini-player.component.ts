import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { StreamService } from '../../core/services/stream.service';
import { Stream } from '../../core/models/stream.model';

@Component({
  selector: 'app-mini-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-player.component.html',
  styleUrl: './mini-player.component.css'
})
export class MiniPlayerComponent implements OnInit {
  // Stream en vivo actual
  liveStream?: Stream;
  // URL segura para el iframe
  streamUrl: any;
  // Estado de carga
  isLoading = true;

  constructor(private streamService: StreamService) { }

  ngOnInit(): void {
    // Obtener la transmisión en vivo
    this.streamService.getLiveStream().subscribe(stream => {
      this.liveStream = stream;
      this.isLoading = false;
      
      if (stream) {
        // Obtener la URL sanitizada
        this.streamUrl = this.streamService.getSanitizedStreamUrl(stream.streamUrl, true);
      }
    });
  }

  openFullPlayer(): void {
    // Llamar al servicio para mostrar el modal
    this.streamService.showFullPlayer();
  }
}
