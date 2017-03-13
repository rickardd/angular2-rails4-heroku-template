import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
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
    this.getCars()
    this.addCar()
  }

  getCars(){
    this._http.get('/api/cars')
      .map( response => response.json())
      .subscribe(response => {
        this.cars = response.cars
        this.numbOfRequests = response.counter
        console.log( this.cars, response )
      });
  }

  addCar(){
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    this._http.post('/api/cars', JSON.stringify({ car: 'Toyota'}), headers)
      .map( response => response.json())
      .subscribe(response => {
        console.log( "new car", response )
      });
  }

}
