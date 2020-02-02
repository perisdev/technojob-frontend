import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private url: string = 'http://localhost:8000/api/';

  private userType: string = 'both';
  private user: object;

  private cities: Array<string> = [];

  constructor() { }

  // URLs
  public getUrl(): string {
    return this.url;
  }

  // USERs
  public setUserType(type: string) {
    this.userType = type;
  }

  public getUserType(): string {
    return this.userType;
  }
  public getUser(): object {

    this.user = JSON.parse(localStorage.getItem('user'));

    return this.user;
  }

  public persistUser(user: object): void {
    this.user = user;

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userType', this.userType);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
    }
  }

  // CITIEs
  public setCities(cities: object): void {

    Object.values(cities).map(item => {
      this.cities.push(item['name']);
    });
  }

  public getCityByName(value: string): number {

    let regex = new RegExp(value, 'i');
    return this.cities.findIndex(item => item.match(regex));
  }

  public getCityById(id: number): string {

    return this.cities[id] ? this.cities[id] : null;
  }
}
