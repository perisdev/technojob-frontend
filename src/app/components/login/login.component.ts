import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // to select a DOM element.
  @ViewChild('email', { read: ElementRef, static: false })
  email;

  // msg from endpoint
  msg: object;
  msgClass: String = 'msgKo';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
    private accessService: AccessService) { }

  // to set focus in username.
  ngAfterViewInit() {
    setTimeout(() => {
      this.email.nativeElement.focus()
    }, 0);
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.storage.setUserType(params.get('userType'));
    });
  }

  logIn(form) {

    if (form.status === 'VALID') {
      this.accessService.login(form.value).subscribe(
        res => {
          this.msg = res;
          this.msgClass = 'msgOk';
          this.storage.persistUser(res["user"]);
          setTimeout(() => {
            if (this.storage.getUserType() == 'worker')
              this.router.navigate(['/workersite/top']);
            else
              this.router.navigate(['/companysite/jobs']);
          }, 100);
        },
        err => {
          this.msg = err.error;
          this.msgClass = 'msgKo';
        }
      );

    } else {
      this.msg = { message: '.. complement all data ..' }
    }
  }

}
