import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
export class HomeComponent implements OnInit, OnDestroy {
  artists: Observable<ArtistModel[]>;
  artistsSubscription!: Subscription;
  apiUrl = environment.apiUrl
  arrArtists: ArtistModel[] = [];
  active!: string;

  constructor(private store: Store<AppState>) {
    this.artists = store.select(state => state.artists.artists);
  }
  ngOnInit(): void {
    this.store.dispatch(fetchArtistRequest());
    this.artistsSubscription = this.artists.subscribe( arrArtists => {
        this.arrArtists = arrArtists.slice(0, 3);
    })
  }

  onClick() {
    let logo: any = document.querySelector('.logo');
    logo.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })

  }

  ngOnDestroy() {
    this.artistsSubscription.unsubscribe();
  }
}

