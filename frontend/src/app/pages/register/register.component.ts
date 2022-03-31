import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { LoginUserDataFb, RegisterError } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { loginFbRequest, loginGoogleRequest, registerUserRequest } from '../../store/users.actions';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('form') form!: NgForm;
  error: Observable<null | RegisterError>;
  errSubscription!: Subscription;
  loading: Observable<boolean>;
  loadingFb: Observable<boolean>;
  authStateSub!: Subscription;
  isGoogleLogin = false;

  constructor(
    private store: Store<AppState>,
    private auth: SocialAuthService,
  ) {
    this.error = store.select( state => state.users.registerError);
    this.loading = store.select( state => state.users.registerLoading);
    this.loadingFb = store.select( state => state.users.loadingFb);
  }

  ngOnInit() {
    this.authStateSub = this.auth.authState.subscribe( (userData: SocialUser) => {
      if (this.isGoogleLogin) {
        this.store.dispatch(loginFbRequest({userData: userData}));
      } else {
        this.store.dispatch(loginGoogleRequest({userData: userData}))
      }
    })
  }

  ngAfterViewInit(): void {
    this.errSubscription = this.error.subscribe(error => {
      if (error) {
        const message = error.errors.email.message;
        this.form.form.get('email')?.setErrors({serverError: message});
      } else {
        this.form.form.get('email')?.setErrors({});
      }
    });
  }

  fbLogin() {
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  googleLogin() {
    this.isGoogleLogin = true;
    void this.auth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  onSubmit() {
    this.store.dispatch(registerUserRequest({userData: this.form.value}));
  }

  ngOnDestroy() {
    this.errSubscription.unsubscribe();
  }
}
