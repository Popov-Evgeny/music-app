import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  createTrackFailure,
  createTrackRequest,
  createTrackSuccess,
  fetchTracksFailure,
  fetchTracksRequest,
  fetchTracksSuccess, updateTrackRequest, updateTrackSuccess
} from './tracks.actions';
import { TracksService } from '../services/tracks.service';
import { Router } from '@angular/router';



@Injectable()

export class TracksEffects {
  constructor(
    private actions: Actions,
    private tracksService: TracksService,
    private router: Router
  ) {}


  fetchTracks = createEffect( () => this.actions.pipe(
    ofType(fetchTracksRequest),
    mergeMap( id => this.tracksService.getTracks(id.id).pipe(
      map( tracks => fetchTracksSuccess({tracks})),
      catchError(() => of(fetchTracksFailure({error: 'Error!'})))
    ))
  ));

  createTrack = createEffect(() => this.actions.pipe(
    ofType(createTrackRequest),
    mergeMap(({data}) => this.tracksService.createTrack(data).pipe(
      map(() => createTrackSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createTrackFailure({error: 'Wrong data'})))
    ))
  ));

  updateArtist = createEffect(() => this.actions.pipe(
    ofType(updateTrackRequest),
    mergeMap(({data}) => this.tracksService.publishTrack(data).pipe(
      map(() => updateTrackSuccess())
    ))
  ));
}
