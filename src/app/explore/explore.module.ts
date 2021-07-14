import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './pages/explore/explore.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ExploreComponent
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    MatTableModule,
    MatInputModule
  ]
})
export class ExploreModule { }
