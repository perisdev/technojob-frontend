import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AccessService } from 'src/app/services/access.service';

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
  msg: Object;
  msgClass: String = 'msgKo';

  constructor(private storage: StorageService,
    private accessService: AccessService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.storage.setUserType(params.get('userType'));
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

    if (form.status === 'VALID') {

      let city_id = this.storage.getCityByName(form.value.city_id);
      
      if (city_id != -1) {
        
        form.controls['city_id'].setValue(this.storage.getCityById(city_id));
        form.value.city_id = city_id;
        console.log("city -> " + form.value.city_id);

        this.accessService.register(form.value).subscribe(
          res => {
            this.msg = res;
            this.msgClass = 'msgOk';
            // setTimeout(() => this.autoLogin(form), 500);
          },
          err => {
            console.log("err:", err.error);
            this.msg = err.error;
            this.msgClass = 'msgKo';
          }
        );

      } else {
        this.msg = { message: 'no valid city' };
      }

    } else {
      this.msg = { message: '.. complement all data ..' }
    }
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
