import {Injectable, Output, EventEmitter} from '@angular/core';
import { PlayerConfig } from '../interfaces/player-config';



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

  constructor() { }


  public nextVideo() {
    const localVideos: string[] = this.getVideosFromDisk();
    const video: string = localVideos[this.getRandomInt(0, localVideos.length)];

    this.currentVideo = video;
    this.fire.emit(video);
  }

  public getVideoStream(): EventEmitter<string> {
    return this.fire;
  }

  public getVideosFromDisk(): string[] {
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
