import { Component, OnInit } from '@angular/core';
import { ArtistModel } from '../../models/artist.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { fetchArtistRequest } from '../../store/artist.actions';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.sass']
})
export class ArtistsComponent implements OnInit {
  artists: Observable<ArtistModel[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  apiUrl = environment.apiUrl

  constructor(private store: Store<AppState>) {
    this.artists = store.select( state => state.artists.artists);
    this.loading = store.select( state => state.artists.fetchLoading);
    this.error = store.select( state => state.artists.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchArtistRequest());
  }
}
