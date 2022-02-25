import { createReducer, on } from '@ngrx/store';
import { fetchArtistFailure, fetchArtistRequest, fetchArtistSuccess } from './artist.actions';
import { ArtistsState } from './types';

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  fetchError: null
}

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistRequest, state => ({...state, fetchLoading: true})),
  on(fetchArtistSuccess, (state, {artists}) => ({...state, fetchLoading: false, artists})),
  on(fetchArtistFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
)
