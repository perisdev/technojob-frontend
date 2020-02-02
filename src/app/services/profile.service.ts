import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private storage: StorageService, private httpClient: HttpClient) { }

  // EndPoints
  public myProfile(token: string): Observable<object> {
    return this.httpClient.get(this.storage.getUrl() + 'myprofile', {
      headers: {
        Authorization: token
      }
    })
  }
}
