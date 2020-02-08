import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-workersite',
  templateUrl: './workersite.component.html',
  styleUrls: ['./workersite.component.scss']
})
export class WorkersiteComponent implements OnInit {

  public viewType: string = "";

  constructor(private storage: StorageService,
    private profileService: ProfileService,
    private jobServices: JobService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    if (this.storage.getUser()) {

      this.route.paramMap.subscribe(params => {

        this.viewType = params['params'].listType; 

        switch (this.viewType) {

          case 'subscriptions':    

            this.profileService.myProfile(this.storage.user['token']).subscribe(
              
              res => this.storage.subscriptions = res["jobs"],
              err => console.log("subscriptions error: ", err)
            );            
            break;

          case 'top':

            this.jobServices.getTopJobs().subscribe(
              res => this.storage.topJobs = Object.values(res),
              err => console.log("jobsTop error: ", err)
            );  
            break;

          default:
            break;
        }
      });

    } else {
      this.router.navigate(['']);
    }
  }

  public emptySearch(): boolean {

    return (this.storage.workerSearch.length) ? false:true;
  }
}
