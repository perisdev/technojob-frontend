import { Component, OnInit, AfterContentInit, DoCheck } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AccessService } from 'src/app/services/access.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, DoCheck {

  public user: object;
  public readOnly: boolean = true;
  public editPass: boolean = false;
  public msg: object;

  constructor(private storage: StorageService,
    private accessService: AccessService,
    private profileService: ProfileService,
    private router: Router) { }

  ngOnInit() {
  }

  ngDoCheck() {

    if (!this.user)
      this.user = this.storage.getUser();
  }

  logout() {
    let user = this.storage.getUser();

    this.accessService.logout(user['token'], { "email": `${user['email']}` }).subscribe(
      res => {
        this.storage.persistUser(undefined);
        this.user = null;
        this.router.navigate(['']);
      },
      err => console.log(err));

  }

  getAvatarClass(): string {
    return (this.storage.getUserType() == 'worker') ? "avatar-worker" : "avatar-company";
  }

  changePass(form) {
    if (form.status === 'VALID') {

      this.profileService.pass(this.user['token'], form.value).subscribe(
        res => {
          this.msg = { message: '.. change successful ..' }

          setTimeout(() => {
            this.msg = {};
            this.editPass = false;
          }, 2000);
        },
        err => {
          this.msg = err.error;

          setTimeout(() => this.msg = {}, 2000);
        }
      );      
      
    } else {
      this.msg = { message: '.. complement all data ..' }

      setTimeout(() => this.msg = {}, 2000);
    }
  }

  updateUserData(): void {

    let city_id: number = this.storage.getCityByName(this.user['city_name']);
    let updateUser: object;

    if (city_id < 1) {
      this.user['city_name'] = this.storage.getCityById(this.user['city_id']);
    } else {
      this.user['city_id'] = city_id;
      this.user['city_name'] = this.storage.getCityById(city_id);
    }

    // updateUser = Object.assign({}, this.user);
    updateUser = JSON.parse(JSON.stringify(this.user));
    delete updateUser['city_name'];

    this.profileService.update(this.user['token'], updateUser).subscribe(
      res => {
        this.storage.persistUser(updateUser);
        this.user = this.storage.getUser();
      },
      err => {
        this.msg = err.error;
      }
    );
  }

}
