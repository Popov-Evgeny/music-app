import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiArtistsData, ArtistModel } from '../models/artist.model';
import { map } from 'rxjs/operators';
import { AlbumModel, ApiAlbumData } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }

  getArtists() {
    return this.http.get<ArtistModel []>(environment.apiUrl + '/artists').pipe(map(response => {
      return response.map( artistData => {
        return new ArtistModel(
          artistData._id,
          artistData.name,
          artistData.information,
          artistData.image
        )});
    }))
  }

  createArtist(data: ApiArtistsData) {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    return this.http.post(environment.apiUrl + '/artists', formData);
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


  createAlbum(data: ApiAlbumData) {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    return this.http.post(environment.apiUrl + '/albums', formData);
  }
}
