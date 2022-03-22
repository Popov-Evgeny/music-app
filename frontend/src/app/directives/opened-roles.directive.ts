import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';

@Directive({
  selector: '[appOpenedRoles]'
})
export class OpenedRolesDirective implements OnInit, OnDestroy {

  @Input("appOpenedRoles") roles!: string[];
  user: Observable<null | User>;
  userSub!: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<AppState>,
  ) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit() {
      this.userSub = this.user.subscribe(user => {
        if (user && this.roles.includes(user.role)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }



}
