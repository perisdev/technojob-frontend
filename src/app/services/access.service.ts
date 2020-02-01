import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private storage: StorageService, private httpClient: HttpClient) { }

    // EndPoints
    public register(body: Object): Observable<Object> {
      return this.httpClient.post(this.storage.getUrl() + 'access/register/' + this.storage.getUserType(), body);
    }

    // // EndPoints
    // register(body: object): Observable<object> {
    //   return this.httpclient.post()
    // };
}
