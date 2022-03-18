import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { NotFoundComponent } from './not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { TracksComponent } from './pages/tracks/tracks.component';
import { TrackHistoryComponent } from './pages/track-history/track-history.component';

const routes: Routes = [
  { path: '', component: ArtistsComponent },
  { path: ':id/:name/albums', component: AlbumsComponent },
  { path: ':id/:author/:name/tracks', component: TracksComponent },
  { path: 'track_history', component: TrackHistoryComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginFormComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
