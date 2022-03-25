import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistModel } from '../../models/artist.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchArtistRequest } from '../../store/artist.actions';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  artists: Observable<ArtistModel[]>;
  apiUrl = environment.apiUrl

  constructor(private store: Store<AppState>) {
    this.artists = store.select(state => state.artists.artists);
  }
  ngOnInit(): void {
    this.store.dispatch(fetchArtistRequest());
  }

}

