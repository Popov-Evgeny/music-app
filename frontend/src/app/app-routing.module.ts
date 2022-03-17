import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { NotFoundComponent } from './not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';

const routes: Routes = [
  { path: '', component: ArtistsComponent },
  { path: ':id/:name/albums', component: AlbumsComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginFormComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
