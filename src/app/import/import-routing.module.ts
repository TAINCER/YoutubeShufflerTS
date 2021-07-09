import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportComponent } from './pages/import/import.component';
import { PreloadComponent } from './pages/preload/preload.component';

const routes: Routes = [
  {
    path: '',
    component: ImportComponent
  },
  {
    path: 'preload',
    component: PreloadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule { }
