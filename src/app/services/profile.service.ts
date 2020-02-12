import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private storage: StorageService, private httpClient: HttpClient) { }

  public myProfile(token: string): Observable<object> {
    return this.httpClient.get(this.storage.getUrl() + 'myprofile', {
      headers: {
        Authorization: token
      }
    })
  }

  public update(token: string, body: object): Observable<object> {
    return this.httpClient.patch(this.storage.getUrl() + 'myprofile/update', body, {
      headers: {
        Authorization: token
      }
    })
  }

  public pass(token: string, body: object): Observable<object> {
    return this.httpClient.patch(this.storage.getUrl() + 'myprofile/pass', body, {
      headers: {
        Authorization: token
      }
    })
  }

  public searchWorker(token: string, body: object): Observable<object> {
    return this.httpClient.post(this.storage.getUrl() + 'profiles/search', body, {
      headers: {
        Authorization: token
      }
    })
  }

  public imgUpload(token: string, img: File) {

    let formData = new FormData();
    formData.append('image', img);

    return this.httpClient.post<any>(this.storage.getUrl() + 'myprofile/img', formData, {
      headers: {
        Authorization: token
      }
      // reportProgress: false,
      // observe: 'events'
    });
  }
}
