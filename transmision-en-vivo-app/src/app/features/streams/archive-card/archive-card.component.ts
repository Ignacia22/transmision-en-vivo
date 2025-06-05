import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Stream } from '../../../core/models/stream.model';

@Component({
  selector: 'app-archive-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './archive-card.component.html',
  styleUrl: './archive-card.component.css'
})
export class ArchiveCardComponent {
  @Input() stream!: Stream;

  // Formatea la fecha para mostrarla de forma amigable
  formatDate(date?: Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Calcular duración de la transmisión
  getDuration(startTime?: Date, endTime?: Date): string {
    if (!startTime || !endTime) {
      return '--:--';
    }
    
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const durationMs = end - start;
    
    // Convertir a horas y minutos
    const hours = Math.floor(durationMs / (60 * 60 * 1000));
    const minutes = Math.floor((durationMs % (60 * 60 * 1000)) / (60 * 1000));
    
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}min`;
  }
}
