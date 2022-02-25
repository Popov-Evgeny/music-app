import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiArtistsData, ArtistModel } from '../models/artist.model';
import { map } from 'rxjs/operators';
import { AlbumModel } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }

  getArtists() {
    return this.http.get<ApiArtistsData[]>(environment.apiUrl + '/artists').pipe(map(response => {
      return response.map( artistData => {
        return new ArtistModel(
          artistData._id,
          artistData.name,
          artistData.information,
          artistData.image
        )});
    }))
  }

  getArtistsAlbums(id: string) {
    return this.http.get<AlbumModel[]>(environment.apiUrl + '/albums/withArtist/' + id).pipe(map(response => {
      return response.map( albumData => {
        return new AlbumModel(
          albumData._id,
          albumData.name,
          albumData.author,
          albumData.year,
          albumData.image
        )});
    }))
  }
}
