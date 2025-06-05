import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Stream } from '../../../core/models/stream.model';
import { StreamService } from '../../../core/services/stream.service';

@Component({
  selector: 'app-archive-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './archive-detail.component.html',
  styleUrl: './archive-detail.component.css'
})
export class ArchiveDetailComponent implements OnInit {
  stream?: Stream;
  streamUrl: any;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private streamService: StreamService
  ) {}

  ngOnInit(): void {
      this.loadStream();
  }

  loadStream(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID de transmisión no válido';
      this.isLoading = false;
      return;
    }

    this.streamService.getStreamById(id).subscribe(stream => {
      this.stream = stream;
      this.isLoading = false;
      
      if (stream) {
        this.streamUrl = this.streamService.getSanitizedStreamUrl(stream.streamUrl, false);
      } else {
        this.error = 'Transmisión no encontrada';
      }
    });
  }

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

}
