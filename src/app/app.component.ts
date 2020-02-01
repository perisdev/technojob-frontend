import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from './services/city.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'technojob-frontend';

  constructor(private router: Router, private cityService: CityService, private storage: StorageService) {

    this.loadCitiesInStorage();
  }

  loadCitiesInStorage() {
    this.cityService.getCities().subscribe(
      res => {
        this.storage.setCities(res);
      },
      err => {
        this.storage.setCities({ name: "VALENCIA" });
        console.log("err:", err.error);
      }
    );
  }

}
