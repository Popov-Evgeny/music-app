import { ArtistModel } from '../models/artist.model';
import { AlbumModel } from '../models/album.model';
import { RegisterError, User } from '../models/user.model';


export type ArtistsState = {
  artists: ArtistModel[],
  fetchLoading: boolean,
  fetchError: null | string
};

export type AlbumsState = {
  albums: AlbumModel[],
  fetchLoading: boolean,
  fetchError: null | string
};


export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError
};

export type AppState = {
  artists: ArtistsState,
  albums: AlbumsState,
  users: UserState
}
