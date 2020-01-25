import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private userType: string = 'both';

  constructor() { }

  setUserType(type: string) {
    this.userType = type;
  }

  getUserType(): String {
    return this.userType;
  }
}
