import { Injectable, Output, EventEmitter } from '@angular/core';
import { PlayerConfig } from '../interfaces/player-config';
import { HttpClient } from '@angular/common/http';
import { Noembed } from '../interfaces/noembed';
import { IVideo } from '../interfaces/ivideo';



@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  @Output() fire: EventEmitter<string> = new EventEmitter();

  private config: PlayerConfig = {
    autoplay: false,
    loop: false
  };

  private currentVideo: string;

  constructor(
    private httpClient: HttpClient
  ) { }


  public async nextVideo() {
    const localVideos: IVideo[] = this.getVideosFromDisk();
    const video: string = localVideos[this.getRandomInt(0, localVideos.length)].id;

    this.setWindowTitle((await this.getVideoInformation(video)).title);

    this.currentVideo = video;
    this.fire.emit(video);
  }

  public refresh() {
    this.fire.emit(this.currentVideo);
  }

  public setVideo(video: IVideo) {
    this.setWindowTitle(video.title);
    this.currentVideo = video.id;
    this.fire.emit(video.id);
  }

  public getVideoStream(): EventEmitter<string> {
    return this.fire;
  }

  public async getVideoInformation(videoId: string): Promise<Noembed> {
    return await new Promise((resolve, reject) => {
      this.httpClient.get<Noembed>(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`)
      .subscribe(res => resolve(res) );
    });
  }

  public setWindowTitle(title: string) {
    document.title = title;
  }
  
  public getVideosFromDisk(): IVideo[] {
    if (localStorage.getItem('videos') === null) {
      return [];
    }

    return JSON.parse(localStorage.getItem('videos'));
  }

  public setConfig(autoplay: boolean, loop: boolean): void {
    this.config = {
      autoplay,
      loop
    };

    this.fire.emit(this.currentVideo);
  }

  public getConfig(): PlayerConfig {
    return this.config;
  }

  public getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
