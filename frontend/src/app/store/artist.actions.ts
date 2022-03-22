import { createAction, props } from '@ngrx/store';
import { ApiArtistsData, ArtistModel } from '../models/artist.model';
import { Publish } from '../models/user.model';

export  const fetchArtistRequest = createAction('[Artist] Fetch Request');
export  const fetchArtistSuccess = createAction('[Artist] Fetch Success', props<{artists: ArtistModel[]}>());
export  const fetchArtistFailure = createAction('[Artist] Fetch Failure', props<{error: string}>());

export const createArtistRequest = createAction('[Artist] Create Request', props<{data: ApiArtistsData}>());
export const createArtistSuccess = createAction('[Artist] Create Success');
export const createArtistFailure = createAction('[Artist] Create Failure', props<{error: string}>());

export const updateArtistRequest = createAction('[Artist] Update Request', props<{data: Publish}>());
export const updateArtistSuccess = createAction('[Artist] Update Success');
