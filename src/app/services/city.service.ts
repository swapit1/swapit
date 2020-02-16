import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) {
    this.GetCities();
  }
  GetCities() {
    return this.http.get<any[]>('assets/data/allCities.json').pipe(map(res => {
      let cities = [];
      res.forEach(city => {
        cities.push({ label: city["שם_ישוב"], value: city["שם_ישוב"] })
      });
      return cities
    }))
  }
}
