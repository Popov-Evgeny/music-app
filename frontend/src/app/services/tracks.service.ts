import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ApiTracksData, TracksModel } from '../models/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  constructor(private http: HttpClient) { }

  getTracks(id: string) {
    return this.http.get<ApiTracksData[]>(environment.apiUrl + '/tracks?album=' + id).pipe(map(response => {
      return response.map( tracksData => {
        return new TracksModel(
          tracksData._id,
          tracksData.name,
          tracksData.album,
          tracksData.duration
        )});
    }))
  }
}
