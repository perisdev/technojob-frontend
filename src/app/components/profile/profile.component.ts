import { Component, OnInit, AfterContentInit, DoCheck } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AccessService } from 'src/app/services/access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, DoCheck {

  public user: object;
  public readOnly: boolean = true;

  constructor(private storage: StorageService,
    private accessService: AccessService,
    private router: Router) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.user = JSON.parse(localStorage.getItem('user'));
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

  getAvatarClass(): string {
    return (this.storage.getUserType() == 'worker') ? "avatar-worker" : "avatar-company";
  }
}
