import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { WeatherService } from '../weather.service';

import { Weather } from '../weather'

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  city:string='';
  weather: Weather[];
  lat;
  lon;

  errorMessage;


  constructor(private weatherService:WeatherService) { }

  public getWeather() {
    this.errorMessage='';
    this.weatherService.getWeather(this.city)
    .subscribe((response) => {this.weather=response},
     (error) => {this.errorMessage=error; console.log(this.errorMessage); this.city=""},
     () => {this.city=''}
    )

  }

  public getMyWeather() {
    if('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success)=>{
        this.lat=success.coords.latitude;
        this.lon=success.coords.longitude;

        this.weatherService.getMyWeather(this.lat,this.lon)
        .subscribe((response) => {this.weather=response},
        (error) => {this.errorMessage=error; console.log(this.errorMessage)}
        )
      })
    }
  }

  ngOnInit() {
  }

}
