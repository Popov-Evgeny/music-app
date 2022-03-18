import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env} from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ApiTrackHistoryData, TrackHistoryData, TrackHistoryModel } from '../models/trackHistory.model';

@Injectable({
  providedIn: 'root'
})
export class TrackHistoryService {
  constructor(private http: HttpClient) { }

  getTrackHistory(id: string) {
    return this.http.get<ApiTrackHistoryData[]>(env.apiUrl + '/track_history?user=' + id).pipe(map(response => {
      return response.map( trackHistoryData => {
        return new TrackHistoryModel(
          trackHistoryData._id,
          trackHistoryData.user,
          trackHistoryData.track,
          trackHistoryData.datetime
        )});
    }))
  }

  createTrackHistory(trackHistoryData: TrackHistoryData) {
    return this.http.post(env.apiUrl + '/track_history', {track: trackHistoryData.track}, {
      headers: new HttpHeaders({'Authorization': trackHistoryData.token})
    })}
}
