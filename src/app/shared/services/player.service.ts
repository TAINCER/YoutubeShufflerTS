import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVideo } from '../../interfaces/IVideo';
import { IPlayerConfig } from '../../interfaces/IPlayerConfig';
import { INoEmbed } from '../../interfaces/INoEmbed';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  @Output() fire: EventEmitter<string> = new EventEmitter();

  private currentVideo: string;
  private config: IPlayerConfig = {
    autoplay: false,
    loop: false
  };

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

  public async getVideoInformation(videoId: string): Promise<INoEmbed> {
    return await this.httpClient
      .get<INoEmbed>(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`)
      .toPromise();
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

  public getConfig(): IPlayerConfig {
    return this.config;
  }

  public getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
