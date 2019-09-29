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

  errorMessage;


  constructor(private weatherService:WeatherService) { }

  public getWeather() {
    this.errorMessage='';
    this.weatherService.getWeather(this.city)
    .subscribe((response) => {this.weather=response},
     (error) => {this.errorMessage=error, this.city=""},
     () => {this.city=''}
    )

  }

  ngOnInit() {
  }

}
