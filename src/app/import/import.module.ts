import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './pages/import/import.component';
import { PreloadComponent } from './pages/preload/preload.component';


@NgModule({
  declarations: [
    ImportComponent,
    PreloadComponent
  ],
  imports: [
    CommonModule,
    ImportRoutingModule,
    MatProgressBarModule
  ]
})
export class ImportModule { }
