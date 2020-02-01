import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private storage: StorageService, private router: Router, private accessService: AccessService) {}

  ngOnInit() {
  
  }

  // user is already logged. 
  isAlreadyLogged() {

    let token = localStorage.getItem('token');

    // if (token)
    //   this.userService.getProfile(token).subscribe(
    //     // is logged
    //     res => {
    //       this.userService.setUser(res, token);
    //       this.router.navigate(['/movies/premieres']);
    //     },
    //     // no logged, clean localStorage
    //     err => {
    //       localStorage.removeItem('token');
    //       localStorage.removeItem('user');
    //     }
    //   );
  }  

  logout(){
    let user = this.storage.getUser();

    console.log(user['token'], user['email']);

    this.accessService.logout(user['token'], { "email": `${user['email']}`}).subscribe(
      res => {
        console.log("front: logout Ok");
        this.storage.persistUser(undefined);
        this.router.navigate(['']);
      },
      err => console.log(err)  // removeMe
    )
  }
}