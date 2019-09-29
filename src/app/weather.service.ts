import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Weather } from './weather'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  baseURL:string = "https://api.openweathermap.org/data/2.5/weather?"
  apiKey: string = "807ced8e3aa14c64ae44caaaf4291b3d";

  constructor(private http:HttpClient) { }

  public getWeather(city:string): Observable<Weather[]> {
    return this.http.get<Weather[]>(this.baseURL+"q="+city+"&appid="+this.apiKey)
  }

  public getMyWeather(lat,lon): Observable<Weather[]> {
    return this.http.get<Weather[]>(this.baseURL+"lat="+lat+"&lon="+lon+"&appid="+this.apiKey)
  }

}
