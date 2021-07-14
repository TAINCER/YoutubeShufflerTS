import { Component, OnInit, ElementRef } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Video } from 'src/app/shared/interfaces/Video';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  allVideos: Video[];

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private elRef: ElementRef
  ) { }

  async ngOnInit(): Promise<void> {
    window.resizeTo(1280, 720);
    this.elRef.nativeElement.ownerDocument.body.style.overflow = 'scroll';

    this.allVideos = this.playerService.getVideosFromDisk();
  }

  setVideo(video: Video): void {
    this.playerService.setVideo(video);
    this.router.navigate(['/']);
  }
}
