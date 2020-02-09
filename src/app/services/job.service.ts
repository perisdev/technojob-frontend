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

  /**
   * search jobs by match value and place.
   * 
   * @param token 
   * @param body 
   */
  public search(token: string, body: object): Observable<object> {
    return this.httpClient.post(this.storage.getUrl() + 'jobs/search', body, {
      headers: {
        Authorization: token
      }
    })
  }

  /**
   * remove one job
   * 
   * @param token 
   * @param jobId 
   */
  public removeJob(token: string, jobId: number): Observable<object> {
    return this.httpClient.delete(this.storage.getUrl() + 'jobs/remove/' + jobId, {
      headers: {
        Authorization: token
      }
    });
  }

  /**
   * change job status to finalized
   * 
   * @param token 
   * @param jobId 
   */
  public finalizeJob(token: string, jobId: number): Observable<object> {
    return this.httpClient.patch(this.storage.getUrl() + 'jobs/final/' + jobId, {}, {
      headers: {
        Authorization: token
      }
    })
  }

}
