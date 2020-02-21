import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    window.resizeTo(880, 450);

    this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
  }

}
