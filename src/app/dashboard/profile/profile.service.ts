import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthData } from 'src/app/models/authdata';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  URL = 'http://localhost:4201';
  userInfo!: AuthData;

  getUserInfo(): Observable<AuthData[]> {
  return this.http.get<AuthData[]>(`${this.URL}/users?${this.userInfo.user}`)
  }

}

