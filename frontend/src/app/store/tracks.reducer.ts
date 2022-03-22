import { TracksState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createTrackFailure,
  createTrackRequest,
  createTrackSuccess,
  fetchTracksFailure,
  fetchTracksRequest,
  fetchTracksSuccess, updateTrackRequest, updateTrackSuccess
} from './tracks.actions';

const initialState: TracksState = {
  tracks: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  updateLoading: false
}

export const tracksReducer = createReducer(
  initialState,
  on(fetchTracksRequest, state => ({...state, fetchLoading: true})),
  on(fetchTracksSuccess, (state, {tracks}) => ({...state, fetchLoading: false, tracks})),
  on(fetchTracksFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createTrackRequest, state => ({...state, createLoading: true})),
  on(createTrackSuccess, state => ({...state, createLoading: false})),
  on(createTrackFailure, (state, {error}) => ({...state, createLoading: false, createError: error,})),

  on(updateTrackRequest, state => ({...state, updateLoading: true})),
  on(updateTrackSuccess, state => ({...state, updateLoading: false})),
)
