import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: `<h1>Oops, not found!</h1>`,
  styles: [`
    h1
      color: #c2185b
      font-size: 80px
      font-style: italic
      padding: 80px
      text-align: center

  `]
})
export class NotFoundComponent implements OnInit{

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      void this.router.navigate(['/']);
    }, 5000);
  }
}
