import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists.component';

const routes: Routes = [
  { path: '', component: ArtistsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
