export class TrackHistoryModel {
  constructor(
    public _id: string,
    public user: string,
    public track: {
      _id: string,
      name: string
    },
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
  track: {
    _id: string,
    name: string
  },
  datetime: string
}
