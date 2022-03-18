import { TrackHistoryState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createTrackHistoryFailure,
  createTrackHistoryRequest,
  createTrackHistorySuccess,
  fetchTrackHistoryFailure,
  fetchTrackHistoryRequest,
  fetchTrackHistorySuccess
} from './trackHistory.actions';

const initialState: TrackHistoryState = {
  trackHistory: [],
  fetchLoading: false,
  fetchError: null
}

export const trackHistoryReducer = createReducer(
  initialState,
  on(fetchTrackHistoryRequest, state => ({...state, fetchLoading: true})),
  on(fetchTrackHistorySuccess, (state, {trackHistory}) => ({...state, fetchLoading: false, trackHistory})),
  on(fetchTrackHistoryFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createTrackHistoryRequest, state => ({...state, fetchLoading: true})),
  on(createTrackHistorySuccess, state => ({...state, fetchLoading: false})),
  on(createTrackHistoryFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
)
