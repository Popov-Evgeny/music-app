import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MusicService } from '../services/music.service';
import { fetchArtistFailure, fetchArtistRequest, fetchArtistSuccess } from './artist.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()

export class ArtistEffects {
  fetchArtists = createEffect( () => this.actions.pipe(
    ofType(fetchArtistRequest),
    mergeMap( () => this.musicService.getArtists().pipe(
     map( artists => fetchArtistSuccess({artists})),
      catchError(() => of(fetchArtistFailure({error: 'Error!'})))
    ))
  ));


  constructor(
    private actions: Actions,
    private musicService: MusicService
  ) {}
}
