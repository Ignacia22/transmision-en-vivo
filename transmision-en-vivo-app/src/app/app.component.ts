import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MiniPlayerComponent } from './components/mini-player/mini-player.component';
import { FullPlayerModalComponent } from './components/full-player-modal/full-player-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MiniPlayerComponent, FullPlayerModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'transmision-en-vivo-app';
}
