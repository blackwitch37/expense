import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../data/API';
import { LocalData } from '../../data/LocalData';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) {

  }

  getLocation(){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
    };
    return this.http.get(API.ApiUrl + "/data.php/MsLocation",header);
  }

  changeLoc(locId, locName, locDesc, active, act){
    var input = { "loc_id": locId, "loc_name": locName, "loc_desc": locDesc, "loc_active": active, "action": act };

    var header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.post(API.ApiUrl + "/data.php/MsLocation", JSON.stringify(input), header);
  }

//   signApp(){
//     var input={"id": LocalData.getAppId(), "device": 'Browser'};
//     return this.http.post(API.ApiUrl + "/login.php/SignApp", input);
//   }
 
}
