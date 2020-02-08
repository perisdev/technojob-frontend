import { Component, OnInit, OnChanges, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AccessService } from 'src/app/services/access.service';
import { ProfileService } from 'src/app/services/profile.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public searchValue = "";

  constructor(private storage: StorageService,
    private router: Router,
    private profileService: ProfileService,
    private jobService: JobService) { }

  ngOnInit() {
    this.isAlreadyLogged();
  }

  ngDoCheck() {
  }

  // user is already logged. 
  isAlreadyLogged() {

    let user = JSON.parse(localStorage.getItem('user'));

    if (user)
      this.profileService.myProfile(user.token).subscribe(
        // is logged
        res => {
          this.storage.setUserType(localStorage.getItem('userType'));
          if (localStorage.getItem('userType') == 'worker')
            this.router.navigate([`/workersite/subscriptions`]);
          else
            this.router.navigate([`/companysite`]);

        },
        // no logged, clean localStorage
        err => {
          localStorage.removeItem('userType');
          localStorage.removeItem('user');
          this.storage.cleanUser();
        }
      );
  }

  // search by value and city_id
  mySearch(e) {

    let body: object = {};

    if (this.searchValue.length > 2)
      body["input"] = this.searchValue;

    if (e.target.text != "*")
      body["city"] = this.storage.getCityByName(e.target.text);
    
    this.jobService.search(this.storage.user['token'], body).subscribe(
      res => {
        this.storage.workerSearch = Object.values(res);
        this.router.navigate(['/workersite/search']);
      },
      err => {
        console.log("search error: ", err);
      }
    ); 

  }
}