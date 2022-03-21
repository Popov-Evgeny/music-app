import { createReducer, on } from '@ngrx/store';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  fetchArtistFailure,
  fetchArtistRequest,
  fetchArtistSuccess
} from './artist.actions';
import { ArtistsState } from './types';

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null
}

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistRequest, state => ({...state, fetchLoading: true})),
  on(fetchArtistSuccess, (state, {artists}) => ({...state, fetchLoading: false, artists})),
  on(fetchArtistFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createArtistRequest, state => ({...state, createLoading: true})),
  on(createArtistSuccess, state => ({...state, createLoading: false})),
  on(createArtistFailure, (state, {error}) => ({...state, createLoading: false, createError: error,}))
)
