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

  city: string = '';
  weather;
  lat;
  lon;
  icon;

  errorMessage;


  constructor(private weatherService: WeatherService) { }

  public getWeather() {
    this.errorMessage = '';
    this.weatherService.getWeather(this.city)
      .subscribe((response) => {
        this.weather = response
        console.log(this.weather.main.temp)
        this.weather.main.temp = Math.round(this.weather.main.temp - 273);
        console.log(this.weather.main.temp)
        let iconId = this.weather.weather[0].icon
        console.log(iconId)
        this.icon = this.getIcon(iconId);
        console.log(this.icon)
      },
        (error) => { 
          this.errorMessage = error;
           console.log(this.errorMessage); 
           this.city = "" 
          },
        () => { 
          this.city = ''
         }
      )

  }

  public getMyWeather() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherService.getMyWeather(this.lat, this.lon)
          .subscribe((response) => { 
            this.weather = response 
            console.log(this.weather.main.temp)
            this.weather.main.temp = Math.round(this.weather.main.temp - 273);
            console.log(this.weather.main.temp)
          },
            (error) => { this.errorMessage = error; console.log(this.errorMessage) }
          )
      })
    }
  }

  public getIcon(id) {
    let iconUrl = 'http://openweathermap.org/img/wn/' + id + '@2x.png'
    return iconUrl;
  }

  ngOnInit() {
  }

}
