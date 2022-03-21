import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumModel } from '../../models/album.model';
import { ArtistModel } from '../../models/artist.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchAlbumRequest } from '../../store/album.actions';
import { createArtistRequest, fetchArtistRequest } from '../../store/artist.actions';
import { NgForm } from '@angular/forms';
import { ApiTracksData } from '../../models/tracks.model';
import { createTrackRequest } from '../../store/tracks.actions';

@Component({
  selector: 'app-create-new-track',
  templateUrl: './create-new-track.component.html',
  styleUrls: ['./create-new-track.component.sass']
})
export class CreateNewTrackComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  albums: Observable<AlbumModel[]>;
  artists: Observable<ArtistModel[]>;
  loading: Observable<boolean>;
  error: Observable<string | null>;
  isDisabled = true;


  constructor(private store: Store<AppState>) {
    this.artists = this.store.select( state => state.artists.artists);
    this.albums = this.store.select(state => state.albums.albums);
    this.loading = store.select(state => state.tracks.createLoading);
    this.error = store.select(state => state.tracks.createError);
  }
  ngOnInit(): void {
    this.store.dispatch(fetchArtistRequest());
  }

  onSubmit() {
    const data: ApiTracksData = this.form.value;
    this.store.dispatch(createTrackRequest({data}))
  }

  onChooseAuthor(id: string) {
    this.store.dispatch(fetchAlbumRequest({id: id}));
    this.isDisabled = false;
  }
}
