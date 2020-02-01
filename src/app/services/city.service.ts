import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient,  private storage: StorageService) { }

  // EndPoints
  public getCities(): Observable<Object> {
    return this.httpClient.get(this.storage.getUrl() + 'cities');
  }
}
