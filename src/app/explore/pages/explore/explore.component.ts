import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Video } from 'src/app/shared/interfaces/Video';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  allVideos: Video[];
  displayedColumns = ["id", "title", "thumbnail"];
  dataSource: MatTableDataSource<Video>;
  showSearchField = false;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private elRef: ElementRef
  ) { }

  async ngOnInit(): Promise<void> {
    window.resizeTo(1280, 720);
    this.elRef.nativeElement.ownerDocument.body.style.overflow = 'scroll';

    this.allVideos = this.playerService.getVideosFromDisk();
    this.dataSource = new MatTableDataSource(this.allVideos);
  }

  setVideo(video: Video): void {
    this.playerService.setVideo(video);
    this.router.navigate(['/']);
  }

  searchInput(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "x") {
      this.showSearchField = !this.showSearchField;

      if (this.showSearchField)
        setTimeout(() => document.getElementById('searchButton').focus({ preventScroll: false }), 25);
    }
  }
}
