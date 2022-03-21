export class AlbumModel {
  constructor(
    public _id: string,
    public name: string,
    public author: { _id: string, name: string, information: string },
    public year: string,
    public image: string
  ) {}
}

export interface ApiAlbumData {
  [key: string]: any,
  name: string,
  author: {_id: string, name: string, information: string },
  year: string,
  image: string
}
