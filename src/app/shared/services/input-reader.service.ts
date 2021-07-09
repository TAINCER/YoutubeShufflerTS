import { Injectable } from '@angular/core';
import { Video } from '../interfaces/Video';

@Injectable({
  providedIn: 'root'
})
export class InputReaderService {

  constructor() { }

  saveInput(videos: Video[]) {
    localStorage.setItem('videos', JSON.stringify(videos));
  }

  async saveInputAsync(videos: Video[]) {
    return await new Promise<void>((resolve, reject) => {
      this.saveInput(videos);
      resolve();
    })
  }
}
