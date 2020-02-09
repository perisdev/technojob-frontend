import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-companysite',
  templateUrl: './companysite.component.html',
  styleUrls: ['./companysite.component.scss']
})
export class CompanysiteComponent implements OnInit {

  public viewType: string = "";

  // msg from endpoint
  msg: object;

  constructor(private storage: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private profileService: ProfileService) { }

  ngOnInit() {

    if (this.storage.getUser()) {

      this.route.paramMap.subscribe(params => {

        this.viewType = params['params'].listType;

        switch (this.viewType) {

          case 'new':

            break;

          case 'jobs':

            this.profileService.myProfile(this.storage.user['token']).subscribe(

              res => {
                this.storage.companyJobs = res["jobs"];
                console.log('companyJobs: ', this.storage.companyJobs);
              },
              err => console.log("companyJobs error: ", err)
            );
            break;

          case 'workers':

            // this.jobServices.getTopJobs().subscribe(
            //   res => this.storage.topJobs = Object.values(res),
            //   err => console.log("jobsTop error: ", err)
            // );  
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

    return (this.storage.workerSearch.length) ? false : true;
  }

  public newJob(form) {

    if (form.status === 'VALID') {

      form.value['company_id'] = this.storage.user['id'];
      console.log(form.value);
      this.jobService.createJob(this.storage.user['token'], form.value).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/companysite/jobs']);
        },
        err => {
          this.msg = err.error;
          setTimeout(() => this.msg = { message: ""} , 2000);
        }
      );

    } else {
      this.msg = { message: '.. complement all data ..' }
      setTimeout(() => this.msg = { message: ""} , 2000);
    }
  }

}
