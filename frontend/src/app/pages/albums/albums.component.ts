import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { AlbumModel } from '../../models/album.model';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchAlbumRequest } from '../../store/album.actions';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.sass']
})
export class AlbumsComponent implements OnInit {
  albums: Observable<AlbumModel[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  apiUrl = environment.apiUrl
  artistName!: string;
  artistInfo!: string;

  constructor(private musicService: MusicService, private route: ActivatedRoute, private store: Store<AppState>) {
    this.albums = this.store.select(state => state.albums.albums);
    this.loading = this.store.select( state => state.albums.fetchLoading);
    this.error = this.store.select( state => state.albums.fetchError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artistName = params['name'];
      this.store.dispatch(fetchAlbumRequest({id: params['id']}))
    });
    this.albums.subscribe( album => {
      this.artistInfo = album[0]?.author.information;
    })
  }
}
