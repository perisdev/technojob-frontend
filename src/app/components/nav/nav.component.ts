import { Component, OnInit, OnChanges, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AccessService } from 'src/app/services/access.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public searchValue = "";

  constructor(private storage: StorageService,
    private router: Router,
    private profileService: ProfileService) { }

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

  // search by title
  mySearch(e) {

    console.log('click:', e.target.text, this.searchValue);
    // if (search.key === 'Enter')
    //   this.router.navigate(['/movies/title/', {
    //     title: search.target.value
    //   }]);
  }
}