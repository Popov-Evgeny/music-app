import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ArtistModel } from '../models/artist.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }

  getArtists() {
    return this.http.get<ArtistModel[]>(environment.apiUrl + '/artists').pipe(map(response => {
      return response.map( artistData => {
        return new ArtistModel(
          artistData.id,
          artistData.name,
          artistData.information,
          artistData.image
        )});
    }))
  }
}
