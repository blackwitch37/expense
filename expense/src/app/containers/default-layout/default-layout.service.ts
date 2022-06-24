import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalData } from '../../data/LocalData';
import { API } from '../../data/API';

@Injectable()
export class DefaultLayoutService {

  constructor(private http: HttpClient) {

  }

  getLocations(){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
    };
    return this.http.get(API.ApiUrl + "/data.php/Location",header);
  }

//   signApp(){
//     var input={"id": LocalData.getAppId(), "device": 'Browser'};
//     return this.http.post(API.ApiUrl + "/login.php/SignApp", input);
//   }
 
}
