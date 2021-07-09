import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../shared/services/player.service';

@Component({
  selector: 'app-control-elements',
  templateUrl: './control-elements.component.html',
  styleUrls: ['./control-elements.component.scss']
})
export class ControlElementsComponent implements OnInit {

  public video: string = '-';
  private videoUrl: string = '';

  constructor(
    private player: PlayerService
  ) { }

  ngOnInit() {
    this.video = this.player.getVideosFromDisk().length + ' Videos has been Loaded! ';
    this.player.getVideoStream().subscribe((video: string) => {
      this.videoUrl = 'https://www.youtube.com/watch?v=' + video;
    });
  }

  updatePlayerConfig(isAutoplay: boolean, isLoop: boolean): void {
    this.player.setConfig(isAutoplay, isLoop);
  }

  copyUrl() {

    var el: any = document.createElement('textarea');
    el.value = this.videoUrl;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  open() {
    window.open(this.videoUrl, "_blank")
  }

}
