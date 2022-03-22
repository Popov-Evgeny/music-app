import { Component, OnInit } from '@angular/core';
import { ArtistModel } from '../../models/artist.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { fetchArtistRequest, removeArtistRequest, updateArtistRequest } from '../../store/artist.actions';
import { environment } from '../../../environments/environment';
import { Publish } from '../../models/user.model';
import { Router } from '@angular/router';

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

  constructor(private store: Store<AppState>, private router: Router,) {
    this.artists = store.select( state => state.artists.artists);
    this.loading = store.select( state => state.artists.fetchLoading);
    this.error = store.select( state => state.artists.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchArtistRequest());
  }

  onLink(id: string, name: string) {
    void this.router.navigate(['/', id, name, 'albums'])
  }

  onPublish(id: string, event: Event) {
    event.stopPropagation();
    const data: Publish = {
      id: id,
      isPublished: true
    }
    this.store.dispatch(updateArtistRequest({data}))
    this.store.dispatch(fetchArtistRequest());
  }

  onRemove(id: string, event: Event) {
    event.stopImmediatePropagation();
    this.store.dispatch(removeArtistRequest({id}));
  }
}
