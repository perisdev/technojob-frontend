import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-workerpill',
  templateUrl: './workerpill.component.html',
  styleUrls: ['./workerpill.component.scss']
})
export class WorkerpillComponent implements OnInit {

  @Input()
  iJob: number = -1;

  @Input()
  iWorker: number = -1;

  @Input()
  detailType: string;

  public job: object;

  constructor(private storage: StorageService, private jobService: JobService) { }

  ngOnInit() {
  }

  public changeWorkerStatus(status: number) {

    let jobId = this.storage.companyJobs[this.iJob]['id'];
    let body = {
      "workerId": this.storage.companyJobs[this.iJob]['workers'][this.iWorker].id,
      "status": status
    };

    this.jobService.statusJobWorker(this.storage.user['token'], body, jobId).subscribe(
      res => {
        this.storage.companyJobs[this.iJob]['workers'][this.iWorker]['pivot']['status'] = status;
      },
      err => {
        console.log(err.error);
      }
    );
  }

  public sendMail(email: String) {
    window.open(`mailto:${email}`);
  }
  // window.open('mailto:' + email);
}
