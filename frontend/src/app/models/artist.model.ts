export class ArtistModel {
  constructor(
    public _id: string,
    public name: string,
    public information: string,
    public image: string
  ) {}
}

export interface ApiArtistsData {
  _id: string,
  name: string,
  information: string,
  image: string
}
