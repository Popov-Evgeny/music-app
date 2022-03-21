import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumModel } from '../../models/album.model';
import { ArtistModel } from '../../models/artist.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchAlbumRequest } from '../../store/album.actions';
import { fetchArtistRequest } from '../../store/artist.actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-new-track',
  templateUrl: './create-new-track.component.html',
  styleUrls: ['./create-new-track.component.sass']
})
export class CreateNewTrackComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  albums: Observable<AlbumModel[]>;
  artists: Observable<ArtistModel[]>;
  isDisabled = true;


  constructor(private store: Store<AppState>) {
    this.artists = this.store.select( state => state.artists.artists);
    this.albums = this.store.select(state => state.albums.albums);
  }
  ngOnInit(): void {
    this.store.dispatch(fetchArtistRequest());
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onChooseAuthor(id: string) {
    this.store.dispatch(fetchAlbumRequest({id: id}));
    this.isDisabled = false;
  }
}
