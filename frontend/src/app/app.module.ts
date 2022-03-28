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
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ValidatePasswordDirective } from './validate-password.directive';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UsersEffects } from './store/users.effects';
import { userReducer } from './store/users.reducer';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { localStorageSync } from 'ngrx-store-localstorage';
import { TracksComponent } from './pages/tracks/tracks.component';
import { tracksReducer } from './store/tracks.reducer';
import { TracksEffects } from './store/tracks.effects';
import { MatSliderModule } from '@angular/material/slider';
import { trackHistoryReducer } from './store/trackHistory.reducer';
import { TrackHistoryEffects } from './store/trackHistory.effects';
import { TrackHistoryComponent } from './pages/track-history/track-history.component';
import { AuthInterceptor } from './auth.interceptor';
import { PersonalAreaComponent } from './pages/personal-area/personal-area.component';
import { CreateNewArtistComponent } from './pages/create-new-artist/create-new-artist.component';
import { CreateNewAlbumComponent } from './pages/create-new-album/create-new-album.component';
import { CreateNewTrackComponent } from './pages/create-new-track/create-new-track.component';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './pages/home/home.component';
import { UserTypeDirective } from './directives/user-type.directive';
import { HasRolesDirective } from './directives/has-roles.directive';
import { OpenedRolesDirective } from './directives/opened-roles.directive';
import { PlayerComponent } from './pages/plaer/plaer.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { FooterComponent } from './pages/footer/footer.component';

export const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{'users': ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: Array<MetaReducer> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ArtistsComponent,
    AlbumsComponent,
    NotFoundComponent,
    RegisterComponent,
    ValidatePasswordDirective,
    FileInputComponent,
    LoginFormComponent,
    TracksComponent,
    TrackHistoryComponent,
    PersonalAreaComponent,
    CreateNewArtistComponent,
    CreateNewAlbumComponent,
    CreateNewTrackComponent,
    HomeComponent,
    UserTypeDirective,
    HasRolesDirective,
    OpenedRolesDirective,
    PlayerComponent,
    ContactsComponent,
    FooterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        FormsModule,
        FlexLayoutModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        StoreModule.forRoot({
            artists: artistsReducer,
            albums: albumsReducer,
            users: userReducer,
            tracks: tracksReducer,
            trackHistory: trackHistoryReducer,
        }, {metaReducers}),
        EffectsModule.forRoot([ArtistEffects, AlbumsEffects, UsersEffects, TracksEffects, TrackHistoryEffects]),
        MatCardModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSnackBarModule,
        MatMenuModule,
        MatSliderModule,
        MatSelectModule,
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
