import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  createTrackHistoryFailure,
  createTrackHistoryRequest, createTrackHistorySuccess,
  fetchTrackHistoryFailure,
  fetchTrackHistoryRequest,
  fetchTrackHistorySuccess
} from './trackHistory.actions';
import { TrackHistoryService } from '../services/track-history.service';

@Injectable()

export class TrackHistoryEffects {
  constructor(
    private actions: Actions,
    private trackHistoryService: TrackHistoryService
  ) {}

  fetchTrackHistory = createEffect( () => this.actions.pipe(
    ofType(fetchTrackHistoryRequest),
    mergeMap( token => this.trackHistoryService.getTrackHistory(token.token).pipe(
      map( trackHistory => fetchTrackHistorySuccess({trackHistory})),
      catchError(() => of(fetchTrackHistoryFailure({error: 'Error!'})))
    ))
  ));

  createTrackHistory = createEffect( () => this.actions.pipe(
    ofType(createTrackHistoryRequest),
    mergeMap( ({data}) => this.trackHistoryService.createTrackHistory(data).pipe(
      map( () => createTrackHistorySuccess()),
      catchError(() => of(createTrackHistoryFailure({error: 'Error!'})))
    ))
  ));
}
