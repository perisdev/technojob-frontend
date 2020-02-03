import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user:object;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.user =  JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
  }
}
