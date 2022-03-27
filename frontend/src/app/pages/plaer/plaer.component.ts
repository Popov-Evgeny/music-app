import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-plaer',
  templateUrl: './plaer.component.html',
  styleUrls: ['./plaer.component.sass']
})
export class PlayerComponent {
  audioEvents = ["ended", "error", "play", "playing", "pause", "timeupdate", "canplay", "loadedmetadata", "loadstart"];

  volume = 50
  duration = '00:00';
  time = '00:00';
  seek = 0;
  maxSeek = 0;
  isClickPlay = false;
  changeIcon = true;
  songUrl!: string;
  title = 'Linkin - Park';
  song = 'Numb'

  audioObj = new Audio();

  files = [
    {
      url: './assets/Numb.mp3',
      composition: 'Numb',
      author: 'Linkin - Park'
    }, {
      url: './assets/Zero.mp3',
      composition: 'Zero',
      author: 'Amready & YAFUKS '
    }, {
      url: './assets/way.mp3',
      composition: 'Way',
      author: 'Cassette'
    }, {
      url: './assets/war.mp3',
      composition: 'War',
      author: 'Ivanna'
    },{
      url: './assets/2_phut-hon.mp3',
      composition: '2_phut_hon',
      author: 'Phao'
    },
    ]

  play() {
    if (this.isClickPlay) {
      this.audioObj.play();
    } else {
      this.songUrl = this.files[0].url;
      this.streamObs(this.files[0].url).subscribe( event => {});
    }
    this.isClickPlay = true;
    this.changeIcon = false;
  }

  pause() {
    this.audioObj.pause();
    this.changeIcon = true;
  }

  stop() {
    this.audioObj.pause();
    this.audioObj.currentTime = 0
  }

  open(url: string, author: string, composition: string) {
    this.title = author;
    this.song = composition;
    this.changeIcon = false;
    this.songUrl = url;
    this.streamObs(url).subscribe( event => {});
  }


  setSeek(event: MatSliderChange) {
    throw this.audioObj.currentTime = (<MatSliderChange>event).value!;
  }

  prevSong() {
    const ind = this.files.findIndex(song => song.url === this.songUrl);
    if (ind !== 0) {
      this.changeIcon = false;
      this.title =  this.files[ind - 1].author;
      this.song =  this.files[ind - 1].composition;
      this.songUrl = this.files[ind - 1].url;
      this.streamObs(this.files[ind - 1].url).subscribe( event => {});
    }
  }

  nextSong() {
    const ind = this.files.findIndex(song => song.url === this.songUrl);
    if ((ind + 1) !== this.files.length) {
      this.changeIcon = false;
      this.title =  this.files[ind + 1].author;
      this.song =  this.files[ind + 1].composition;
      this.songUrl = this.files[ind + 1].url;
      this.streamObs(this.files[ind + 1].url).subscribe( event => {});
    }
  }

  setVolume(event: MatSliderChange) {
    const volume = (<MatSliderChange>event).value!
    this.volume = Math.floor(volume * 100);
    this.audioObj.volume = volume;
  }

  streamObs(url: string) {
    return new Observable(observable => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        this.maxSeek = this.audioObj.duration;
        this.seek = this.audioObj.currentTime;
        this.duration = this.timeFormat(this.audioObj.duration);
        this.time = this.timeFormat(this.audioObj.currentTime);
      }

      this.addEvent(this.audioObj, this.audioEvents, handler);

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        this.removeEvent(this.audioObj, this.audioEvents, handler);
      }
    });
  }

  timeFormat( time: any) {
    const format = "mm:ss";
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format)
  }

  addEvent(obj: any, events: any, handler: any) {
    events.forEach( (event: any) => {
      obj.addEventListener(event, handler)
    })
  }

  removeEvent(obj: any, events: any, handler: any) {
    events.forEach( (event: any) => {
      obj.removeEventListener(event, handler)
    })
  }

}
