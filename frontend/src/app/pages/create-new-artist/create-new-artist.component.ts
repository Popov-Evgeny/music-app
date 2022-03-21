import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { createArtistRequest } from '../../store/artist.actions';
import { ApiArtistsData } from '../../models/artist.model';

@Component({
  selector: 'app-create-new-artist',
  templateUrl: './create-new-artist.component.html',
  styleUrls: ['./create-new-artist.component.sass']
})
export class CreateNewArtistComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.artists.createLoading);
    this.error = store.select(state => state.artists.createError);
  }

  ngOnInit() {
  }

  onSubmit() {
    const data: ApiArtistsData = this.form.value;
    this.store.dispatch(createArtistRequest({data}))
  }
}
