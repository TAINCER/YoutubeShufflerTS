import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-control-elements',
  templateUrl: './control-elements.component.html',
  styleUrls: ['./control-elements.component.scss']
})
export class ControlElementsComponent implements OnInit {

  public video: string = '-';

  constructor(
    private player: PlayerService
  ) { }

  ngOnInit() {
    this.video = this.player.getVideosFromDisk().length + ' Videos has been Loaded! ';
  }

}
