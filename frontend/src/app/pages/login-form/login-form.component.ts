import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { LoginError, LoginUserData } from '../../models/user.model';
import { loginFbRequest, loginGoogleRequest, loginRequest } from '../../store/users.actions';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit, OnDestroy{
  @ViewChild('form') form!: NgForm;
  loading: Observable<boolean>;
  loadingFb: Observable<boolean>;
  error: Observable<null | LoginError>;
  authStateSub!: Subscription;
  isGoogleLogin = false;

  constructor(
    private store: Store<AppState>,
    private auth: SocialAuthService,
  ) {
    this.loading = store.select(state => state.users.loginLoading);
    this.loadingFb = store.select(state => state.users.loadingFb);
    this.error = store.select(state => state.users.loginError);
  }

  ngOnInit() {
    this.authStateSub = this.auth.authState.subscribe( (userData: SocialUser) => {
      if (this.isGoogleLogin) {
        this.store.dispatch(loginGoogleRequest({userData: userData}))
      } else {
        this.store.dispatch(loginFbRequest({userData: userData}));
      }
    })
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginRequest({userData}));
  }

  fbLogin() {
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  googleLogin() {
    this.isGoogleLogin = true;
    void this.auth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }

}
