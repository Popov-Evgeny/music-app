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
    LoginFormComponent
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
      users: userReducer
    }, {metaReducers}),
    EffectsModule.forRoot([ArtistEffects, AlbumsEffects, UsersEffects]),
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
