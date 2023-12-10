import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/models/authdata';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSrv:AuthService, private router:Router) { }

  form!:AuthData

  ngOnInit(): void {
  }

  async onSubmit(form:any){
    console.log(form)
    await this.authSrv.login(form).toPromise()
    this.router.navigate(['/'])
  }

  register(){
    this.router.navigate(['/register'])
  }

}
