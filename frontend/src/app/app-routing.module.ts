import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { NotFoundComponent } from './not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { TracksComponent } from './pages/tracks/tracks.component';
import { TrackHistoryComponent } from './pages/track-history/track-history.component';
import { PersonalAreaComponent } from './pages/personal-area/personal-area.component';
import { CreateNewArtistComponent } from './pages/create-new-artist/create-new-artist.component';
import { CreateNewAlbumComponent } from './pages/create-new-album/create-new-album.component';
import { CreateNewTrackComponent } from './pages/create-new-track/create-new-track.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artists', component: ArtistsComponent },
  { path: ':id/:name/albums', component: AlbumsComponent },
  { path: ':id/:author/:name/tracks', component: TracksComponent },
  { path: 'track_history', component: TrackHistoryComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'Personal-Area', component: PersonalAreaComponent},
  {path: 'create-new-artist', component: CreateNewArtistComponent},
  {path: 'create-new-album', component: CreateNewAlbumComponent},
  {path: 'create-new-track', component: CreateNewTrackComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
