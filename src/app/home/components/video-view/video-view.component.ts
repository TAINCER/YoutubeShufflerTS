import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit, AfterViewInit {

  private videoPlayer: Plyr;
  private isPlayerReady = false;
  public loading = true;

  constructor(
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.playerService.onVideoUpdate().subscribe(() => {
      this.refreshPlayer();
    });
  }

  ngAfterViewInit() {
    this.videoPlayer = new Plyr('#player', {
      autoplay: false,
      muted: false,
      loop: { active: false }
    });

    this.videoPlayer.once('ready', () => {
      if (!this.isPlayerReady) {
        this.videoPlayer.autoplay = true;
        this.refreshPlayer();
        this.isPlayerReady = true
      }
    });

    this.videoPlayer.on('ended', () => {
      if (this.playerService.getConfig().autoplay) {
        this.playerService.nextVideo();
      }
    });
  }

  private refreshPlayer() {
    if (typeof (this.playerService.getCurrentVideo()) === 'undefined') {
      return;
    }

    this.videoPlayer.loop = this.playerService.getConfig().loop;

    this.videoPlayer.source = {
      type: 'video',
      sources: [
        {
          src: this.playerService.getCurrentVideo(),
          provider: 'youtube'
        }
      ]
    };

    this.loading = false;
  }

}
