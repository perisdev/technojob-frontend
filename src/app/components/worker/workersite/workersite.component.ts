import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-workersite',
  templateUrl: './workersite.component.html',
  styleUrls: ['./workersite.component.scss']
})
export class WorkersiteComponent implements OnInit {

  constructor(private storage: StorageService, private profileService: ProfileService) {
  }

  ngOnInit() {

    this.profileService.myProfile(this.storage.user['token']).subscribe(
      // is logged
      res => {
        this.storage.subscriptions = res["jobs"];
        console.log("myProfile: ", this.storage.subscriptions);
        console.log("len:",this.storage.subscriptions.length);
      },
      // no logged, clean localStorage
      err => {
        console.log("myProfile: ", err);
      }
    );
  }

  public getDetail(index) {
    console.log(index);
  }

}
