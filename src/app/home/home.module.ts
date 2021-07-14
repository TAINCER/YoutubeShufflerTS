import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BottomButtonComponent } from './components/bottom-button/bottom-button.component';
import { ControlElementsComponent } from './components/control-elements/control-elements.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { MainComponent } from './pages/main/main.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    MainComponent,
    BottomButtonComponent,
    ControlElementsComponent,
    VideoViewComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatButtonModule,
    ClipboardModule,
    MatGridListModule
  ]
})
export class HomeModule { }
