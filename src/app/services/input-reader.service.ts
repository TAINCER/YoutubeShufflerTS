import { Injectable } from '@angular/core';
import { IVideo } from '../interfaces/ivideo';

@Injectable({
  providedIn: 'root'
})
export class InputReaderService {

  constructor() { }

  saveInput(videos: IVideo[]) {
    localStorage.setItem('videos', JSON.stringify(videos));
  }

  async saveInputAsync(videos: IVideo[]) {
    return await new Promise((resolve, reject) => {
      this.saveInput(videos);
      resolve();
    })
  }
}
