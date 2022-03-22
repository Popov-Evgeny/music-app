import { ArtistModel } from '../models/artist.model';
import { AlbumModel } from '../models/album.model';
import { LoginError, RegisterError, User } from '../models/user.model';
import { TracksModel } from '../models/tracks.model';
import { TrackHistoryModel } from '../models/trackHistory.model';


export type ArtistsState = {
  artists: ArtistModel[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  updateLoading: boolean,
  removeLoading: boolean,
};

export type AlbumsState = {
  albums: AlbumModel[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  updateLoading: boolean,
  removeLoading: boolean,
};


export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError
};

export type TracksState = {
  tracks: TracksModel[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  updateLoading: boolean,
  removeLoading: boolean,
};

export type TrackHistoryState = {
  trackHistory: TrackHistoryModel[],
  fetchLoading: boolean,
  fetchError: null | string
};

export type AppState = {
  artists: ArtistsState,
  albums: AlbumsState,
  users: UserState,
  tracks: TracksState,
  trackHistory: TrackHistoryState,
}
