import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthData } from 'src/app/models/authdata';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private profileSrv:ProfileService) { }

  sub!:Subscription
  profile!:any
  user!: AuthData

  ngOnInit(){
    this.profile = localStorage.getItem('user');

    if (!this.profile) {
      return;
    }
    this.user = JSON.parse(this.profile);
  }

}
