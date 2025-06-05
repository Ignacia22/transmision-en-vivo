import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { StreamService } from '../../core/services/stream.service';

@Component({
  selector: 'app-mini-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-player.component.html',
  styleUrl: './mini-player.component.css'
})
export class MiniPlayerComponent implements OnInit {
  // URL segura para el iframe
  streamUrl: any;

  constructor(private streamService: StreamService) { }

  ngOnInit(): void {
    // Obtener la URL de transmisión del servicio
    this.streamUrl = this.streamService.getStreamUrl();
  }

  openFullPlayer(): void {
    // Llamar al servicio para mostrar el modal
    this.streamService.showFullPlayer();
  }
}
