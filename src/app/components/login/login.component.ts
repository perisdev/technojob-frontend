import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

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
    public store: StorageService) { }

  // to set focus in username.
  ngAfterViewInit() {
    setTimeout(() => {
      this.email.nativeElement.focus()
    }, 0);
  }


  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.store.setUserType(params.get('userType'));
    });
  }

  logIn(form) {

    if (form.status === 'VALID')
      // this.userService.login(form.value).subscribe(
      //   res => {
      //     this.msg = res;
      //     this.msgClass = 'msgOk';
      //     setTimeout(() => this.autoProfile(res['token']), 1000);
      //   },
      //   err => {
      //     this.msg = err.error;
      //     this.msgClass = 'msgKo';
      //   });

      this.msg = { message: '.. VALID ..' }    // toRemove
    else
      this.msg = { message: '.. complement all data ..' }
  }

}
