import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MusicService } from '../services/music.service';
import { fetchAlbumFailure, fetchAlbumRequest, fetchAlbumSuccess } from './album.actions';

@Injectable()

export class AlbumsEffects {
  fetchAlbums = createEffect( () => this.actions.pipe(
    ofType(fetchAlbumRequest),
    mergeMap( artistId => this.musicService.getArtistsAlbums(artistId.id).pipe(
      map( albums => fetchAlbumSuccess({albums})),
      catchError(() => of(fetchAlbumFailure({error: 'Error!'})))
    ))
  ));


  constructor(
    private actions: Actions,
    private musicService: MusicService
  ) {}
}
