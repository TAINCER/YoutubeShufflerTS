import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private skipKeys = [
    'Enter',
    ' '
  ];

  constructor(
    private elRef: ElementRef,
    private player: PlayerService
  ) { }

  ngOnInit() {
    window.resizeTo(880, 450);
    window.scrollTo(0, 0);

    this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.skipKeys.includes(event.key)) {
      this.player.nextVideo();
    }
  }

}
