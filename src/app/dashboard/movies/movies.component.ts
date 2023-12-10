import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/models/authdata';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  URL = 'http://localhost:4201'
  movies!:Movie[]
  sub!:Subscription
  favorites!:any[]
  moviesData!:any[]
  constructor(private movieSrv:MoviesService, private http:HttpClient) { }

 ngOnInit(){
  this.sub=this.movieSrv.getMovies().subscribe(movies=>{
    this.movies=movies;
    console.log(this.movies)
  })

  this.sub=this.movieSrv.getFavorites().subscribe(res=>{
    this.favorites=res
    this.moviesData= this.movies.map((movie)=>({
      data : movie,
      favLoading:false,
      favId:this.favorites.find((fav)=>fav.movieId == movie.id)?.id
    }))
    console.log(this.moviesData)
  })
  }

  removeFavorite(favId:number, id:number){
    this.movieSrv.deleteFav(favId).subscribe()
    this.moviesData[id].favLoading=true
    this.moviesData[id].favId=false
  }

  addFavorite(movieId:number, id:number){
    let userId:number=this.movieSrv.userInfo.user.id;
    console.log(userId)
    let data={movieId,userId}
    console.log(data)
     this.movieSrv.addFav(data).subscribe(r=>{
      this.moviesData[id].favLoading=true;
      this.moviesData[id].favId=r.id;
      this.moviesData[id].favLoading=false;
     })
  }
}
