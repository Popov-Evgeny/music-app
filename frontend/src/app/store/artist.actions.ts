import { createAction, props } from '@ngrx/store';
import { ArtistModel } from '../models/artist.model';

export  const fetchArtistRequest = createAction('[Artist] Fetch Request');
export  const fetchArtistSuccess = createAction(
  '[Artist] Fetch Success',
  props<{artists: ArtistModel[]}>());
export  const fetchArtistFailure = createAction(
  '[Artist] Fetch Failure',
  props<{error: string}>());
