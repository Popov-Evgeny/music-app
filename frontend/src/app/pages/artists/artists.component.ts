import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { ArtistModel } from '../../models/artist.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.sass']
})
export class ArtistsComponent implements OnInit {
  arr!: ArtistModel[];
  apiUrl = environment.apiUrl;

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.musicService.getArtists().subscribe( result => {
      this.arr = result;
    })
  }

}
