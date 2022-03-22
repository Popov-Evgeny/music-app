import { createReducer, on } from '@ngrx/store';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  fetchArtistFailure,
  fetchArtistRequest,
  fetchArtistSuccess,
  removeArtistRequest,
  removeArtistSuccess,
  updateArtistRequest,
  updateArtistSuccess
} from './artist.actions';
import { ArtistsState } from './types';

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  updateLoading: false,
  removeLoading: false
}

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistRequest, state => ({...state, fetchLoading: true})),
  on(fetchArtistSuccess, (state, {artists}) => ({...state, fetchLoading: false, artists})),
  on(fetchArtistFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createArtistRequest, state => ({...state, createLoading: true})),
  on(createArtistSuccess, state => ({...state, createLoading: false})),
  on(createArtistFailure, (state, {error}) => ({...state, createLoading: false, createError: error,})),

  on(updateArtistRequest, state => ({...state, updateLoading: true})),
  on(updateArtistSuccess, state => ({...state, updateLoading: false})),

  on(removeArtistRequest, (state, {id}) => {
    const updateArtist = state.artists.filter( artist => {
      return artist._id !== id;
    });

    return {...state, artists: updateArtist, removeLoading: true}
  }),
  on(removeArtistSuccess, state => ({...state, removeLoading: false})),
)
