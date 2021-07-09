import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IVideo } from 'src/app/interfaces/IVideo';
import { InputReaderService } from 'src/app/services/input-reader.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styleUrls: ['./preload.component.scss']
})
export class PreloadComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private inputReaderService: InputReaderService,
    private router: Router
  ) { }

  processValue = 0;
  lastVideo: IVideo;

  private allVideos: IVideo[] = [];

  async ngOnInit(): Promise<void> {
    this.allVideos = this.playerService.getVideosFromDisk();

    for (let i = 0; i < this.allVideos.length; i++) {
      this.lastVideo = await this.processVideo(this.allVideos[i]);
      if (this.lastVideo) {
        await this.replaceVideoContent(this.lastVideo);
      }
      this.processValue = (i / this.allVideos.length) * 100
    }

    this.router.navigate(['/']);
  }

  async replaceVideoContent(video: IVideo): Promise<void> {
    for (let i = 0; i < this.allVideos.length; i++) {
      if (this.allVideos[i].id === video.id) {
        this.allVideos[i] = video;
        await this.inputReaderService.saveInputAsync(this.allVideos);
        return;
      }
    }
  }

  async processVideo(video: IVideo): Promise<IVideo> {
    const result = await this.playerService.getVideoInformation(video.id);
    return {
      id: video.id,
      thumbnail: result.thumbnail_url,
      title: result.title
    }
  }

}
