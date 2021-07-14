import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from '../interfaces/Video';
import { PlayerConfig } from '../interfaces/PlayerConfig';
import { NoEmbed } from '../interfaces/NoEmbed';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  @Output() fire: EventEmitter<string> = new EventEmitter();

  private currentVideo: string;
  private config: PlayerConfig = {
    autoplay: false,
    loop: false
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public async nextVideo() {
    const localVideos: Video[] = this.getVideosFromDisk();
    const video: string = localVideos[this.getRandomInt(0, localVideos.length)].id;

    this.setWindowTitle((await this.getVideoInformation(video)).title);

    this.currentVideo = video;
    this.fire.emit(video);
  }

  public refresh() {
    this.fire.emit(this.currentVideo);
  }

  public setVideo(video: Video) {
    this.setWindowTitle(video.title);
    this.currentVideo = video.id;
    this.fire.emit(video.id);
  }

  public getVideoStream(): EventEmitter<string> {
    return this.fire;
  }

  public async getVideoInformation(videoId: string): Promise<NoEmbed> {
    return await this.httpClient
      .get<NoEmbed>(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`)
      .toPromise();
  }

  public setWindowTitle(title: string) {
    document.title = title;
  }

  public getVideosFromDisk(): Video[] {
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
