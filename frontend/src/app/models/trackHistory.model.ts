export class TrackHistoryModel {
  constructor(
    public _id: string,
    public user: string,
    public track: {
      _id: string,
      name: string
    },
    public datetime: string,
    public artist: string
  ) {}
}

export interface ApiTrackHistoryData {
  _id: string,
  user: string,
  track: {
    _id: string,
    name: string
  },
  datetime: string,
  artist: string
}
