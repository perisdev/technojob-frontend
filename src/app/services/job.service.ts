import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private storage: StorageService, private httpClient: HttpClient) { }

  /**
   * responds with all jobs order TOP (number of workers).
   *
   * accept limit filter
   * -----------------------------------------------*/
  public getTopJobs(): Observable<object> {
    return this.httpClient.get(this.storage.getUrl() + 'jobs/top');
  }

  /**
   * subscribe worker to one job.
   * 
   * @param token 
   * @param jobId 
   */
  public subscribe(token: string, jobId: number): Observable<object> {
    return this.httpClient.post(this.storage.getUrl() + 'jobs/subscribe/' + jobId, {}, {
      headers: {
        Authorization: token
      }
    })
  }
}
