import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthData } from 'src/app/models/authdata';
import { Favorite } from 'src/app/models/favorite';
import { Movie } from 'src/app/models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  URL = 'http://localhost:4201';
  userInfo!: AuthData;

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    this.userInfo = JSON.parse(user);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.URL}/movies-popular`);
  }

  getFavorites(): Observable<Favorite[]> {
    console.log(
      this.http.get<Favorite[]>(
        `${this.URL}/favorites?userId=${this.userInfo.user.id}`
      )
    );
    return this.http.get<Favorite[]>(
      `${this.URL}/favorites?userId=${this.userInfo.user.id}`
    );
  }

  deleteFav(favId:number){
    return this.http.delete(`${this.URL}/favorites/${favId}`)
  }

  addFav(data:{movieId:number,userId:number}){
    return this.http.post<Favorite>(`${this.URL}/favorites`, data)
  }
}
