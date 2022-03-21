export class TracksModel {
  constructor(
    public _id: string,
    public name: string,
    public album: string,
    public duration: string,
    public isPublished: boolean
  ) {}
}

export interface ApiTracksData {
  [key: string]: any,
  name: string,
  album: string,
  duration: string
}
