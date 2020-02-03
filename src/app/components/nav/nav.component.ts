import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
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

  constructor(private storage: StorageService,
    private router: Router,
    private accessService: AccessService,
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
          this.router.navigate([`/${localStorage.getItem('userType')}site`]);
        },        
        // no logged, clean localStorage
        err => {
          localStorage.removeItem('userType');
          localStorage.removeItem('user');
        }
      );
  }

  logout() {
    let user = this.storage.getUser();

    this.accessService.logout(user['token'], { "email": `${user['email']}` }).subscribe(
      res => {
        this.storage.persistUser(undefined);
        this.router.navigate(['']);
      },
      err => console.log(err));
  }
}