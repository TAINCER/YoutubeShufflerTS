import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
declare var Plyr: any;

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit, AfterViewInit {

  private videoPlayer: any;
  private isLoaded: boolean = false;
  public loading: boolean = true;

  constructor(
    private playerService: PlayerService,
  ) { }

  ngAfterViewInit() {
    this.videoPlayer = new Plyr('#player', {
      autoplay: true,
      muted: true,
      loop: { active: false }
    });

    this.videoPlayer.on('ready', () => {
      if (!this.isLoaded) {
        this.isLoaded = true;
        this.playerService.refresh();
      }
    })

    this.videoPlayer.on('ended', () => {
      if (this.playerService.getConfig().autoplay) {
        this.playerService.nextVideo();
      }
    })
  }

  ngOnInit() {
    this.playerService.getVideoStream().subscribe((video: string) => {

      if (typeof (video) !== 'undefined') {
        this.loading = false;

        this.videoPlayer.loop = this.playerService.getConfig().loop;
        this.videoPlayer.muted = false;
        
        this.videoPlayer.source = {
          type: 'video',
          sources: [
            {
              src: video,
              provider: 'youtube'
            }
          ]
        };
      }

    });
  }

}
