import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../shared/services/player.service';

@Component({
  selector: 'app-control-elements',
  templateUrl: './control-elements.component.html',
  styleUrls: ['./control-elements.component.scss']
})
export class ControlElementsComponent implements OnInit {

  public video: string = '-';
  public videoUrl: string = '';

  constructor(
    private player: PlayerService
  ) { }

  ngOnInit() {
    this.video = this.player.getVideosFromDisk().length + ' Videos has been Loaded! ';
    this.player.onVideoUpdate().subscribe((video: string) => {
      this.videoUrl = 'https://www.youtube.com/watch?v=' + video;
    });
  }

  updatePlayerConfig(isAutoplay: boolean, isLoop: boolean): void {
    this.player.setConfig(isAutoplay, isLoop);
  }

  open() {
    window.open(this.videoUrl, "_blank")
  }

}
