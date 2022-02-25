import { createAction, props } from '@ngrx/store';
import { AlbumModel } from '../models/album.model';

export  const fetchAlbumRequest = createAction(
  '[Albums] Fetch Request',
  props<{id: string}>()
  );
export  const fetchAlbumSuccess = createAction(
  '[Albums] Fetch Success',
  props<{albums: AlbumModel[]}>());
export  const fetchAlbumFailure = createAction(
  '[Albums] Fetch Failure',
  props<{error: string}>());
