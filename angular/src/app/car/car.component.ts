import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: any;
  numbOfRequests : number

  constructor(public _http: Http) {

  }

  ngOnInit() {
    this._http.get('/api/cars')
      .map( response => response.json())
      .subscribe(response => {
        this.cars = response.cars
        this.numbOfRequests = response.counter
        console.log( this.cars, response )
      });
  }

}
