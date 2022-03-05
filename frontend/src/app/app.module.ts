import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './ui/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { MatCardModule } from '@angular/material/card';
import { artistsReducer } from './store/artist.reducer';
import { ArtistEffects } from './store/artist.effects';
import { AlbumsEffects } from './store/album.effects';
import { albumsReducer } from './store/album.reducer';
import { NotFoundComponent } from './not-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ArtistsComponent,
    AlbumsComponent,
    NotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    StoreModule.forRoot({
      artists: artistsReducer,
      albums: albumsReducer
    }, {}),
    EffectsModule.forRoot([ArtistEffects, AlbumsEffects]),
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
