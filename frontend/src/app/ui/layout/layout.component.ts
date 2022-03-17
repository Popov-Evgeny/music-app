import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { logoutRequest } from '../../store/users.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isOpen = true;
  user: Observable<null | User>;

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);

  }

  onChange() {
    this.isOpen = !this.isOpen;
  }


  logout() {
    this.store.dispatch(logoutRequest());
  }
}
