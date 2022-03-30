import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { LoginError, LoginUserData, User } from '../../models/user.model';
import { loginRequest, loginSuccess } from '../../store/users.actions';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit, OnDestroy{
  @ViewChild('form') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;
  authStateSub!: Subscription;

  constructor(
    private store: Store<AppState>,
    private auth: SocialAuthService,
    private http: HttpClient
  ) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
  }

  ngOnInit() {
    this.authStateSub = this.auth.authState.subscribe( (user: SocialUser) => {
      this.http.post(environment.apiUrl + '/users/facebookLogin', {
        authToken: user.authToken,
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.photoUrl
      }).subscribe(userData => {
        let user = <User>userData
        this.store.dispatch(loginSuccess({user}));
      });
    })
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginRequest({userData}));
  }

  fbLogin() {
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }

}
