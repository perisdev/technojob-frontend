import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private url: string = 'http://localhost:8000/api/';

  private userType: string = 'both';
  public user: object;
  public status: Array<object> = [
    { msg: 'rejected', msgColor: '#ff0000', bkColor: '#ff000080' },
    { msg: 'pending', msgColor: '#167db7', bkColor: '#167cb780' },
    { msg: 'selected', msgColor: '#2fc42a', bkColor: '#2fc42a80'}
  ];

  private cities: Array<string> = [];
  public citiesObj: Object;

  public subscriptions: Array<object> = [];

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

  public cleanUser():void {
    this.user = null;
  }

  public persistUser(user: object): void {
    
    if (user) {
      this.user = user;
      this.user['city_name'] = this.getCityById(user['city_id']);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userType', this.userType);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      this.user = null;
    }
  }

  // CITIEs
  public setCities(cities: object): void {

    this.citiesObj = cities;

    Object.values(cities).map(item => {
      this.cities.push(item['name']);
    });
  }

  public getCities(): Array<string> {
    return this.cities;
  }

  public getCityByName(value: string): number {

    let regex = new RegExp(value, 'i');
    return this.cities.findIndex(item => item.match(regex));
  }

  public getCityById(id: number): string {

    return this.cities[id] ? this.cities[id] : null;
  }
}
