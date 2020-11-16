import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BottomButtonComponent } from './components/utils/bottom-button/bottom-button.component';
import { ImportComponent } from './components/pages/import/import.component';
import { MainComponent } from './components/pages/main/main.component';
import { ControlElementsComponent } from './components/utils/control-elements/control-elements.component';
import { VideoViewComponent } from './components/utils/video-view/video-view.component';
import { ExploreComponent } from './components/pages/explore/explore.component';
import { PreloadComponent } from './components/pages/import/preload/preload.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'import', component: ImportComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'import/preload', component: PreloadComponent }
  
];

@NgModule({
  declarations: [
    AppComponent,
    BottomButtonComponent,
    ImportComponent,
    MainComponent,
    ControlElementsComponent,
    VideoViewComponent,
    ExploreComponent,
    PreloadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatButtonModule,
    MatCheckboxModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpClientModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
