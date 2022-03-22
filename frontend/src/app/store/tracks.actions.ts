import { createAction, props } from '@ngrx/store';
import { ApiTracksData, TracksModel } from '../models/tracks.model';
import { Publish } from '../models/user.model';

export  const fetchTracksRequest = createAction('[Tracks] Fetch Request', props<{id: string}>());
export  const fetchTracksSuccess = createAction('[Tracks] Fetch Success', props<{tracks: TracksModel[]}>());
export  const fetchTracksFailure = createAction('[Tracks] Fetch Failure', props<{error: string}>());

export const createTrackRequest = createAction('[Track] Create Request', props<{data: ApiTracksData}>());
export const createTrackSuccess = createAction('[Track] Create Success');
export const createTrackFailure = createAction('[Track] Create Failure', props<{error: string}>());

export const updateTrackRequest = createAction('[Track] Update Request', props<{data: Publish}>());
export const updateTrackSuccess = createAction('[Track] Update Success');
