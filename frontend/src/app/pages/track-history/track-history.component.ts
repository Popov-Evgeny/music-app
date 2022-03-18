import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrackHistoryModel } from '../../models/trackHistory.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchTrackHistoryRequest } from '../../store/trackHistory.actions';

@Component({
  selector: 'app-track-history',
  templateUrl: './track-history.component.html',
  styleUrls: ['./track-history.component.sass']
})
export class TrackHistoryComponent implements OnInit, OnDestroy {
  trackHistory: Observable<TrackHistoryModel[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;


  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.trackHistory = this.store.select(state => state.trackHistory.trackHistory);
    this.loading = this.store.select( state => state.trackHistory.fetchLoading);
    this.error = this.store.select( state => state.trackHistory.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchTrackHistoryRequest())
  }

  ngOnDestroy() {
  }

}
