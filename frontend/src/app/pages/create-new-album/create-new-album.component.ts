import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { ArtistModel } from '../../models/artist.model';

@Component({
  selector: 'app-create-new-album',
  templateUrl: './create-new-album.component.html',
  styleUrls: ['./create-new-album.component.sass']
})
export class CreateNewAlbumComponent implements OnInit {
  artists: Observable<ArtistModel[]>;


  constructor(private store: Store<AppState>) {
    this.artists = this.store.select( state => state.artists.artists);

  }
  ngOnInit(): void {
  }


  onSubmit() {

  }
}
