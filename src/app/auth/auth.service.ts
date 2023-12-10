import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { AuthData } from '../models/authdata';
import { map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL = 'http://localhost:4201';

  private authBSubject = new BehaviorSubject<null | AuthData>(null);

  userControl$ = this.authBSubject.asObservable();

  jwtHelper = new JwtHelperService();

  timeoutLogout: any;

  constructor(private http: HttpClient, private router: Router) {
    this.restore();
  }

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.URL}/login`, data).pipe(
      tap((val) => {
        console.log(val);
        this.authBSubject.next(val);
        localStorage.setItem('user', JSON.stringify(val));
      }),
      catchError(error => {
        alert("⚠️ CREDENZIALI NON CORRETTE ⚠️")
        return of(0);
      })
    );
  }

  signUp(data: { name: string; email: string; password: string }) {
    let signup:any
    try{
       signup = this.http.post(`${this.URL}/register`, data)
    }
    catch(err){
      throwError(() => alert(err))
    }return signup
  }

  logout() {
    this.authBSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['']);
    if (this.timeoutLogout) {
      clearTimeout(this.timeoutLogout);
    }
  }
  restore() {
    const user = localStorage.getItem('user');

    if (!user) {
      return;
    }
    const userData: AuthData = JSON.parse(user);
    console.log(user);
    if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
      return;
    }

    this.authBSubject.next(userData);
    this.autoLogout(userData);
  }

  private errors(error: any) {}

  autoLogout(data: AuthData) {
    const expDate = this.jwtHelper.getTokenExpirationDate(
      data.accessToken
    ) as Date;
    const operationEx = expDate.getTime() - new Date().getTime();
    this.timeoutLogout = setTimeout(() => {
      this.logout();
    }, operationEx);
  }
}
