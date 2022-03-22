import { createAction, props } from '@ngrx/store';
import { AlbumModel, ApiAlbumData } from '../models/album.model';
import { Publish } from '../models/user.model';

export  const fetchAlbumRequest = createAction('[Albums] Fetch Request', props<{id: string}>());
export  const fetchAlbumSuccess = createAction('[Albums] Fetch Success', props<{albums: AlbumModel[]}>());
export  const fetchAlbumFailure = createAction('[Albums] Fetch Failure', props<{error: string}>());

export const createAlbumRequest = createAction('[Album] Create Request', props<{data: ApiAlbumData}>());
export const createAlbumSuccess = createAction('[Album] Create Success');
export const createAlbumFailure = createAction('[Album] Create Failure', props<{error: string}>());

export const updateAlbumRequest = createAction('[Album] Update Request', props<{data: Publish}>());
export const updateAlbumSuccess = createAction('[Album] Update Success');
