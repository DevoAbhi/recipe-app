import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAf1Fu_uILLkw83F0srbg1oAl9UpAQ3Iko',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleErrors),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAf1Fu_uILLkw83F0srbg1oAl9UpAQ3Iko',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleErrors),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userID: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    // create a new user
    const user = new User(email, userID, token, expirationDate);
    this.user.next(user);
  }

  private handleErrors(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists! Please enter a new email.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist! Please sign up first!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid! Please enter the correct password!';
    }
    return throwError(errorMessage);
  }
}
