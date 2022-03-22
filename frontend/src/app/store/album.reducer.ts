import { AlbumsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess,
  fetchAlbumFailure,
  fetchAlbumRequest,
  fetchAlbumSuccess, removeAlbumRequest, removeAlbumSuccess, updateAlbumRequest, updateAlbumSuccess
} from './album.actions';


const initialState: AlbumsState = {
  albums: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  updateLoading: false,
  removeLoading: false
}

export const albumsReducer = createReducer(
  initialState,
  on(fetchAlbumRequest, state => ({...state, fetchLoading: true})),
  on(fetchAlbumSuccess, (state, {albums}) => ({...state, fetchLoading: false, albums})),
  on(fetchAlbumFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createAlbumRequest, state => ({...state, createLoading: true})),
  on(createAlbumSuccess, state => ({...state, createLoading: false})),
  on(createAlbumFailure, (state, {error}) => ({...state, createLoading: false, createError: error,})),

  on(updateAlbumRequest, state =>({...state, updateLoading: true})),
  on(updateAlbumSuccess, state => ({...state, updateLoading: false})),

  on(removeAlbumRequest, (state, {id}) => {
    const updateAlbum = state.albums.filter( album => {
      return album._id !== id;
    });

    return {...state, albums: updateAlbum, removeLoading: true}
  }),
  on(removeAlbumSuccess, state => ({...state, removeLoading: false})),
)
