import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ApiTracksData, TracksModel } from '../models/tracks.model';
import { ApiArtistsData } from '../models/artist.model';
import { Publish } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  constructor(private http: HttpClient) { }

  getTracks(id: string) {
    return this.http.get<TracksModel[]>(env.apiUrl + '/tracks?album=' + id).pipe(map(response => {
      return response.map( tracksData => {
        return new TracksModel(
          tracksData._id,
          tracksData.name,
          tracksData.album,
          tracksData.duration,
          tracksData.isPublished
        )});
    }))
  }

  createTrack(data: ApiTracksData) {
    return this.http.post(environment.apiUrl + '/tracks', data);
  }

  publishTrack(data: Publish) {
    return this.http.post(environment.apiUrl +  '/tracks' + data.id + '/publish', data.isPublished);
  }
}
