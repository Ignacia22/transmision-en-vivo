import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  // URL de la transmisión (reemplaza con la URL de Emol)
  private streamUrlBase: string = 'https://www.youtube.com/embed/jfKfPfyJRdk';
  
  // Estado del reproductor a pantalla completa
  private fullPlayerVisible: boolean = false;

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

  // Obtener la URL de transmisión sanitizada
  getStreamUrl(muted: boolean = true): SafeResourceUrl {
    // Construir la URL con parámetros
    const params = new URLSearchParams();
    params.set('autoplay', '1');
    
    if (muted) {
      params.set('mute', '1');
    }
    
    const url = `${this.streamUrlBase}?${params.toString()}`;
    
    // Sanitizar la URL para que Angular permita usarla en un iframe
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  // Método para actualizar la URL de la transmisión
  updateStreamUrl(url: string): void {
    this.streamUrlBase = url;
  }
}
