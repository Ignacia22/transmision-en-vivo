import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Stream } from '../../../core/models/stream.model';
import { StreamService } from '../../../core/services/stream.service';
import { ArchiveCardComponent } from '../archive-card/archive-card.component';

@Component({
  selector: 'app-archive-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ArchiveCardComponent],
  templateUrl: './archive-list.component.html',
  styleUrl: './archive-list.component.css'
})
export class ArchiveListComponent implements OnInit {
  archivedStreams: Stream[] = [];
  isLoading = true;

  constructor(private streamService: StreamService) { }

  ngOnInit(): void {
    this.loadArchivedStreams();
  }

  loadArchivedStreams(): void {
    this.streamService.getArchivedStreams().subscribe(streams => {
      this.archivedStreams = streams;
      this.isLoading = false;
    });
  }
}
