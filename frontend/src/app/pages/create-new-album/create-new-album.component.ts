import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { ArtistModel } from '../../models/artist.model';
import { NgForm } from '@angular/forms';
import { createAlbumRequest } from '../../store/album.actions';
import { ApiAlbumData } from '../../models/album.model';

@Component({
  selector: 'app-create-new-album',
  templateUrl: './create-new-album.component.html',
  styleUrls: ['./create-new-album.component.sass']
})
export class CreateNewAlbumComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  artists: Observable<ArtistModel[]>;
  loading: Observable<boolean>;
  error: Observable<string | null>;


  constructor(private store: Store<AppState>) {
    this.artists = this.store.select( state => state.artists.artists);
    this.loading = store.select(state => state.albums.createLoading);
    this.error = store.select(state => state.albums.createError);
  }

  ngOnInit(): void {
  }


  onSubmit() {
    const data: ApiAlbumData = this.form.value;
    this.store.dispatch(createAlbumRequest({data}))
  }
}
