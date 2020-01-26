import { Component, OnInit } from '@angular/core';
import { InputReaderService } from 'src/app/services/input-reader.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  constructor(
    private inputReaderService: InputReaderService
  ) { }

  ngOnInit() {
  }

  saveNewVideos(videos) {
    if (videos == "") {
      return;
    }

    const regex = /https:\/\/www\.youtube\.com\/watch\?v=([-a-zA-Z0-9_!"$%]){11}/gm;

    let m;
    const l: string[] = [];

    while ((m = regex.exec(videos)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if (groupIndex === 0) {
              l.push(match.split('=')[match.split('=').length - 1])
            }
        });
    }

    this.inputReaderService.saveInput(l);
  }

}
