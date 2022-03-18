export class TrackHistoryModel {
  constructor(
    public _id: string,
    public user: string,
    public track: string,
    public datetime: string
  ) {}
}

export interface TrackHistoryData {
  track: string,
  token: string
}

export interface ApiTrackHistoryData {
  _id: string,
  user: string,
  track: string,
  datetime: string
}
