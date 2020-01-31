import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  // to select a DOM element.
  @ViewChild('username', { read: ElementRef, static: false })
  username;

  // msg from endpoint
  msg: object;
  msgClass: String = 'msgKo';

  constructor(private store: StorageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.store.setUserType(params.get('userType'));
    });
  }

  // to set focus in username.
  ngAfterViewInit() {
    setTimeout(() => {
      this.username.nativeElement.focus()
    }, 0);
  }

  // Sign up
  signUp(form) {

    if (form.status === 'VALID')

      //console.log(form.value);
      // this.accessService.register(form.value).subscribe(
      //   res => {
      //     this.msg = res;
      //     this.msgClass = 'msgOk';
      //     // setTimeout(() => this.autoLogin(form), 500);
      //   },
      //   err => {
      //     this.msg = err.error;
      //     this.msgClass = 'msgKo';
      //   }
      // );

      this.msg = { message: '.. VALID removeME ..' }
    else
      this.msg = { message: '.. complement all data ..' }

  }

  // auto login
  // autoLogin(form) {

  //   this.userService.login(form.value).subscribe(
  //     res => {

  //       let user:object = {
  //         username: form.value.username,
  //         email: form.value.email,
  //         level: 2,
  //       }

  //       this.userService.setUser(user, res['token']);
  //       setTimeout(() => this.router.navigate(['/movies/premieres']), 500);
  //     },
  //     err => this.msg = err.error
  //   );
  // }
}
