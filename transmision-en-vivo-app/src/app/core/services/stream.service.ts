import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Stream } from '../models/stream.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  // Estado del reproductor a pantalla completa
  private fullPlayerVisible: boolean = false;

  // Datos simulados para transmisiones
  private mockStreams: Stream[] = [
    {
      id: '1',
      title: 'Transmisión en Vivo: Noticias del día',
      description: 'Las noticias más importantes de la jornada en tiempo real.',
      thumbnailUrl: 'https://via.placeholder.com/320x180',
      streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
      isLive: true,
      startTime: new Date(),
      categories: ['Noticias', 'En Vivo']
    },
    {
      id: '2',
      title: 'Entrevista Exclusiva: Ministro de Economía',
      description: 'Análisis de las nuevas medidas económicas anunciadas por el gobierno.',
      thumbnailUrl: 'https://via.placeholder.com/320x180',
      streamUrl: 'https://www.youtube.com/embed/K4TOrB7at0Y',
      isLive: false,
      startTime: new Date('2025-06-01T10:00:00'),
      endTime: new Date('2025-06-01T11:30:00'),
      categories: ['Entrevistas', 'Economía']
    },
    {
      id: '3',
      title: 'Reportaje Especial: Avances en Tecnología',
      description: 'Exploramos las nuevas tendencias tecnológicas que están transformando la industria.',
      thumbnailUrl: 'https://via.placeholder.com/320x180',
      streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
      isLive: false,
      startTime: new Date('2025-05-25T15:00:00'),
      endTime: new Date('2025-05-25T16:00:00'),
      categories: ['Tecnología', 'Reportajes']
    }
  ];

  constructor(private sanitizer: DomSanitizer) { }

  // Mostrar el reproductor completo
  showFullPlayer(): void {
    this.fullPlayerVisible = true;
  }

  // Ocultar el reproductor completo
  hideFullPlayer(): void {
    this.fullPlayerVisible = false;
  }

   // Verificar si el reproductor completo está visible
  isFullPlayerVisible(): boolean {
    return this.fullPlayerVisible;
  }

  // Obtener todas las transmisiones
  getStreams(): Observable<Stream[]> {
    return of(this.mockStreams);
  }

  // Obtener la transmisión en vivo actual
  getLiveStream(): Observable<Stream | undefined> {
    const liveStream = this.mockStreams.find(stream => stream.isLive);
    return of(liveStream);
  }

  // Obtener transmisiones archivadas (no en vivo)
  getArchivedStreams(): Observable<Stream[]> {
    const archivedStreams = this.mockStreams.filter(stream => !stream.isLive);
    return of(archivedStreams);
  }

  // Obtener una transmisión por ID
  getStreamById(id: string): Observable<Stream | undefined> {
    const stream = this.mockStreams.find(s => s.id === id);
    return of(stream);
  }

   // Obtener la URL sanitizada para un stream específico
  getSanitizedStreamUrl(streamUrl: string, muted: boolean = true): SafeResourceUrl {
    // Construir la URL con parámetros
    const params = new URLSearchParams();
    params.set('autoplay', '1');
    
    if (muted) {
      params.set('mute', '1');
    }
    
    const url = `${streamUrl}?${params.toString()}`;
    
    // Sanitizar la URL para que Angular permita usarla en un iframe
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
