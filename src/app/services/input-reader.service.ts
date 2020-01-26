import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputReaderService {

  constructor() { }

  saveInput(videos: string[]) {
    localStorage.setItem('videos', JSON.stringify(videos));
  }
}
