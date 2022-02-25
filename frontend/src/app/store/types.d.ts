import { ArtistModel } from '../models/artist.model';
import { AlbumModel } from '../models/album.model';


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

export type AppState = {
  artists: ArtistsState,
  albums: AlbumsState
}
