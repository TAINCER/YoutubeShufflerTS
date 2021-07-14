import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../shared/services/player.service';

@Component({
  selector: 'app-control-elements',
  templateUrl: './control-elements.component.html',
  styleUrls: ['./control-elements.component.scss']
})
export class ControlElementsComponent implements OnInit {

  public video = '-';
  public videoUrl = '';

  public loop: boolean;
  public autoplay: boolean;

  constructor(
    private player: PlayerService
  ) { }

  ngOnInit() {
    this.loop = this.player.getConfig().loop;
    this.autoplay = this.player.getConfig().autoplay;

    this.video = this.player.getVideosFromDisk().length + ' Videos has been Loaded! ';
    this.player.onVideoUpdate().subscribe((video: string) => {
      this.videoUrl = 'https://www.youtube.com/watch?v=' + video;
    });
  }

  updatePlayerConfig(): void {
    this.player.setConfig(this.autoplay, this.loop);
  }

  open() {
    window.open(this.videoUrl, '_blank')
  }

}
