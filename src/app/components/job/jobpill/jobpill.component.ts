import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobpill',
  templateUrl: './jobpill.component.html',
  styleUrls: ['./jobpill.component.scss']
})
export class JobpillComponent implements OnInit {

  @Input()
  index: number;

  @Input()
  detailType: string;

  public msg:object = { message: '...'};

  constructor(private storage: StorageService, private jobService: JobService) { }

  ngOnInit() {

  }

  // get subscription status.
  public getSubsStatus(index: number) {
    return this.storage.subscriptions[index]["pivot"].status;
  }

  public subscribe(index: number) {

    let jobId = (this.detailType === 'top')? this.storage.topJobs[index]['id']:this.storage.workerSearch[index]['id'];

    this.jobService.subscribe(this.storage.user['token'], jobId).subscribe(
      res => {
        this.msg = { message: '.. subscription successful ..'};
      },
      err => {
        this.msg = err.error;
        setTimeout(() => this.msg = { message: '...' }, 2000);
      }
    );   

  }
}
