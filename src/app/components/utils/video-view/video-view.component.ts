import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit {

  public currentVideo: SafeUrl;

  constructor(
    private player: PlayerService,
    private sanizizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.currentVideo = this.sanizizer.bypassSecurityTrustResourceUrl('https://api.csgoplexus.com/plexus/index.html');

    this.player.getVideoStream().subscribe((video: string) => {
      let url: string = `https://www.youtube.com/embed/${video}?autoplay=1`;

      if (this.player.getConfig().loop) {
        url += '&loop=1';
        url += `&playlist=${video}`;
      } else {
        url += '&loop=0';
      }

      this.currentVideo = this.sanizizer.bypassSecurityTrustResourceUrl(url);
    })
  }

}
