import { Component, OnInit } from '@angular/core';
import { InputReaderService } from 'src/app/shared/services/input-reader.service';
import { IVideo } from 'src/app/interfaces/IVideo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  constructor(
    private inputReaderService: InputReaderService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  saveNewVideos(videos) {
    if (videos == "") {
      return;
    }

    const regex = /https:\/\/www\.youtube\.com\/watch\?v=([-a-zA-Z0-9_!"$%]){11}/gm;

    let m;
    const l: IVideo[] = [];

    while ((m = regex.exec(videos)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }


      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        if (groupIndex === 0) {
          l.push({
            id: match.split('=')[match.split('=').length - 1],
            thumbnail: null,
            title: null
          })
        }
      });
    }

    this.inputReaderService.saveInput(l);

    this.router.navigate(['/import/preload']);
  }

}
