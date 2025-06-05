import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { StreamService } from '../../core/services/stream.service';

@Component({
  selector: 'app-full-player-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-player-modal.component.html',
  styleUrl: './full-player-modal.component.css'
})
export class FullPlayerModalComponent implements OnInit {
  // URL segura para el iframe
  streamUrl: any;
  isVisible: boolean = false;

  constructor(private streamService: StreamService) { }

  ngOnInit(): void {
    // Obtener la URL de transmisión sin silenciar
    this.streamUrl = this.streamService.getStreamUrl(false);
  }

  // Se llama en cada ciclo de detección de cambios para verificar si se debe mostrar el modal
  ngDoCheck(): void {
    this.isVisible = this.streamService.isFullPlayerVisible();
    
    // Configurar el overflow del body según la visibilidad del modal
    document.body.style.overflow = this.isVisible ? 'hidden' : 'auto';
  }

  closeModal(): void {
    this.streamService.hideFullPlayer();
  }

  onBackdropClick(event: MouseEvent): void {
    // Cerrar el modal solo si se hizo clic en el fondo, no en el contenido
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal();
    }
  }
}
