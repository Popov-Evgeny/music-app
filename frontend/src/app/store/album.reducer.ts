import { AlbumsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess,
  fetchAlbumFailure,
  fetchAlbumRequest,
  fetchAlbumSuccess
} from './album.actions';


const initialState: AlbumsState = {
  albums: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null
}

export const albumsReducer = createReducer(
  initialState,
  on(fetchAlbumRequest, state => ({...state, fetchLoading: true})),
  on(fetchAlbumSuccess, (state, {albums}) => ({...state, fetchLoading: false, albums})),
  on(fetchAlbumFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createAlbumRequest, state => ({...state, createLoading: true})),
  on(createAlbumSuccess, state => ({...state, createLoading: false})),
  on(createAlbumFailure, (state, {error}) => ({...state, createLoading: false, createError: error,}))
)
