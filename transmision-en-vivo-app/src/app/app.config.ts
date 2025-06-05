import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';

// Si tienes un interceptor, debes importarlo aquí
// import { AuthInterceptor } from './core/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    
    // Si tienes un interceptor, descomentar esto:
    /*
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Aquí faltaba la clase del interceptor
      multi: true
    }
    */
  ]
};