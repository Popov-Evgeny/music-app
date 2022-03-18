import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { TracksService } from '../../services/tracks.service';
import { Observable } from 'rxjs';
import { TracksModel } from '../../models/tracks.model';
import { fetchTracksRequest } from '../../store/tracks.actions';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.sass']
})
export class TracksComponent implements OnInit {
  tracks: Observable<TracksModel[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  albumName!: string;

  constructor(private tracksService: TracksService, private route: ActivatedRoute, private store: Store<AppState>) {
    this.tracks = this.store.select(state => state.tracks.tracks);
    this.loading = this.store.select( state => state.albums.fetchLoading);
    this.error = this.store.select( state => state.albums.fetchError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumName = params['name'];
      this.store.dispatch(fetchTracksRequest({id: params['id']}))
    });
  }

}
