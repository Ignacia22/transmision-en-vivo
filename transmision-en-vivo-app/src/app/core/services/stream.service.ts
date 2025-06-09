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
      thumbnailUrl: 'https://picsum.photos/320/180?random=10',
      streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
      isLive: true,
      startTime: new Date(),
      categories: ['Noticias', 'En Vivo']
    },
    {
      id: '2',
      title: 'Entrevista Exclusiva: Ministro de Economía',
      description: 'Análisis de las nuevas medidas económicas anunciadas por el gobierno.',
      thumbnailUrl: 'https://picsum.photos/320/180?random=11',
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
      thumbnailUrl: 'https://picsum.photos/320/180?random=12',
      streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
      isLive: false,
      startTime: new Date('2025-05-25T15:00:00'),
      endTime: new Date('2025-05-25T16:00:00'),
      categories: ['Tecnología', 'Reportajes']
    },
    {
      id: '4',
      title: 'Debate: Futuro de la Energía Renovable',
      description: 'Expertos discuten sobre las perspectivas y desafíos de la transición energética global.',
      thumbnailUrl: 'https://picsum.photos/320/180?random=13',
      streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
      isLive: false,
      startTime: new Date('2025-05-20T14:00:00'),
      endTime: new Date('2025-05-20T15:30:00'),
      categories: ['Medio Ambiente', 'Debate']
    },
    {
      id: '5',
      title: 'Presentación: Nuevas Políticas de Salud Pública',
      description: 'El Ministerio de Salud anuncia importantes actualizaciones en el sistema sanitario nacional.',
      thumbnailUrl: 'https://picsum.photos/320/180?random=14',
      streamUrl: 'https://www.youtube.com/embed/K4TOrB7at0Y',
      isLive: false,
      startTime: new Date('2025-05-18T10:00:00'),
      endTime: new Date('2025-05-18T11:15:00'),
      categories: ['Salud', 'Política']
    },
    {
      id: '6',
      title: 'Conferencia: Avances en Inteligencia Artificial',
      description: 'Investigadores presentan los últimos desarrollos en IA y sus aplicaciones prácticas.',
      thumbnailUrl: 'https://picsum.photos/320/180?random=15',
      streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
      isLive: false,
      startTime: new Date('2025-05-15T16:00:00'),
      endTime: new Date('2025-05-15T18:00:00'),
      categories: ['Tecnología', 'Inteligencia Artificial']
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

  ensureLiveStreamAvailable(): void {
  // Esta función se asegura de que siempre haya una transmisión en vivo activa
  const liveStream = this.mockStreams.find(stream => stream.isLive);
  if (!liveStream) {
    // Si no hay transmisiones en vivo, convertir la más reciente en "en vivo"
    const streams = [...this.mockStreams];
    streams.sort((a, b) => {
      const dateA = a.startTime ? new Date(a.startTime).getTime() : 0;
      const dateB = b.startTime ? new Date(b.startTime).getTime() : 0;
      return dateB - dateA;
    });
    
    if (streams.length > 0) {
      streams[0].isLive = true;
      this.mockStreams = streams;
    }
  }
}
}
