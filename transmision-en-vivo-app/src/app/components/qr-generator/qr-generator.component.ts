import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qr-generator.component.html',
  styleUrl: './qr-generator.component.css'
})
export class QrGeneratorComponent {
  baseUrl: string = 'http://localhost:4200';
  customPath: string = '';
  addAutoplay: boolean = true;
  addQr: boolean = false;
  addStream: boolean = false;
  finalUrl: string = '';
  qrImageUrl: string = '';

  generateQR() {
    let url = this.baseUrl.trim();
    
    // Añadir ruta personalizada si existe
    if (this.customPath) {
      url += '/' + this.customPath.trim();
    }
    
    // Añadir parámetros
    const params: string[] = [];
    
    if (this.addAutoplay) {
      params.push('autoplay=true');
    }
    
    if (this.addQr) {
      params.push('qr=true');
    }
    
    if (this.addStream) {
      params.push('stream=live');
    }
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    
    this.finalUrl = url;
    
    // Usar el servicio de QR Code Generator API
    this.qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  }

}
