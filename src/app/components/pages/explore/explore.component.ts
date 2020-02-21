import { Component, OnInit, ElementRef } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { IVideo } from 'src/app/interfaces/ivideo';
import { InputReaderService } from 'src/app/services/input-reader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  allVideos: IVideo[];

  constructor(
    private playerService: PlayerService,
    private inputReaderService: InputReaderService,
    private router: Router,
    private elRef: ElementRef
  ) { }

  async ngOnInit(): Promise<void> {
    window.resizeTo(880, 1000);
    this.elRef.nativeElement.ownerDocument.body.style.overflow = 'scroll';
    
    this.allVideos = this.playerService.getVideosFromDisk();
    console.log();
    const videosToProcess: IVideo[] = this.allVideos.filter((v: IVideo) => v.thumbnail === null && v.title === null);
    console.log(videosToProcess.length);
    
    for (let i = 0; i < videosToProcess.length; i++) {
      console.log(`Processing: ${videosToProcess[i].id}`);
      
      await this.replaceVideoContent(await this.processVideo(videosToProcess[i]));
      console.log(`${videosToProcess[i].id} Done`);
      
    }
    
    
  }

  setVideo(video: IVideo): void {
    this.playerService.setVideo(video);
    this.router.navigate(['/']);
  }

  async replaceVideoContent(video: IVideo): Promise<void> {
    for (let i = 0; i < this.allVideos.length; i++) {
      if (this.allVideos[i].id === video.id) {
        this.allVideos[i] = video;
        await this.inputReaderService.saveInputAsync(this.allVideos);
        return;
      }
    }
  }

  async processVideo(video: IVideo): Promise<IVideo> {
    const result = await this.playerService.getVideoInformation(video.id);
    return {
      id: video.id,
      thumbnail: result.thumbnail_url,
      title: result.title
    }
  }

}
