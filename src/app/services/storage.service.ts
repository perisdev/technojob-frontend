import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private userType: String = 'both';
  private url: String = 'http://localhost:8000/api/';

  constructor() { }

  setUserType(type: String) {
    this.userType = type;
  }

  getUserType(): String {
    return this.userType;
  }

  getUrl(): String {
    return this.url;
  }
}
