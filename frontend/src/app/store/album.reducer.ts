import { AlbumsState } from './types';
import { createReducer, on } from '@ngrx/store';
import { fetchAlbumFailure, fetchAlbumRequest, fetchAlbumSuccess } from './album.actions';

const initialState: AlbumsState = {
  albums: [],
  fetchLoading: false,
  fetchError: null
}

export const albumsReducer = createReducer(
  initialState,
  on(fetchAlbumRequest, state => ({...state, fetchLoading: true})),
  on(fetchAlbumSuccess, (state, {albums}) => ({...state, fetchLoading: false, albums})),
  on(fetchAlbumFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
)
