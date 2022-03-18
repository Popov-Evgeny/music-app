import { createAction, props } from '@ngrx/store';
import { TracksModel } from '../models/tracks.model';

export  const fetchTracksRequest = createAction('[Tracks] Fetch Request', props<{id: string}>());
export  const fetchTracksSuccess = createAction('[Tracks] Fetch Success', props<{tracks: TracksModel[]}>());
export  const fetchTracksFailure = createAction('[Tracks] Fetch Failure', props<{error: string}>());
