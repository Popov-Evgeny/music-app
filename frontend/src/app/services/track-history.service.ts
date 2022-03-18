import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ApiTrackHistoryData, TrackHistoryModel } from '../models/trackHistory.model';

@Injectable({
  providedIn: 'root'
})
export class TrackHistoryService {

  constructor(private http: HttpClient) { }

  getTrackHistory() {
    return this.http.get<ApiTrackHistoryData[]>(env.apiUrl + '/track_history').pipe(map(response => {
      return response.map( trackHistoryData => {
        return new TrackHistoryModel(
          trackHistoryData._id,
          trackHistoryData.user,
          trackHistoryData.track,
          trackHistoryData.datetime,
          trackHistoryData.artist
        )});
    }))
  }

  createTrackHistory(track: string) {
    return this.http.post(env.apiUrl + '/track_history', {track})
  }
}
