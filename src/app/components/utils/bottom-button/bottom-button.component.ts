import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-bottom-button',
  templateUrl: './bottom-button.component.html',
  styleUrls: ['./bottom-button.component.scss']
})
export class BottomButtonComponent {

  constructor(
    private router: Router,
    private player: PlayerService
  ) { }

  nextVideoClick(e) {
    if (e.ctrlKey) {
      this.router.navigate(['/import']);
      return;
    } else if (e.altKey) {
      this.router.navigate(['/explore']);
      return;
    }

    this.player.nextVideo();

  }

  saveNewVideos(videos) {
    console.log(videos)
/*
    const regex = /https:\/\/www\.youtube\.com\/watch\?v=([-a-zA-Z0-9_!"$%]){11}/gm;
    let m;

    while ((m = regex.exec(videos)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
        });
    }

    console.log(m)
*/
  }
}
