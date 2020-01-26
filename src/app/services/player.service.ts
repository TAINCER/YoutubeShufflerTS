import {Injectable, Output, EventEmitter} from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  @Output() fire: EventEmitter<string> = new EventEmitter();

  constructor() { }


  public nextVideo() {
    const localVideos: string[] = this.getVideosFromDisk();
    const video: string = localVideos[this.getRandomInt(0, localVideos.length)];

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

  public getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
}
