import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../data/API';
import { LocalData } from '../../data/LocalData';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {

  }

  getUser(){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
    };
    return this.http.get(API.ApiUrl + "/data.php/MsUser",header).toPromise();
  }

  getLocation(){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
    };
    return this.http.get(API.ApiUrl + "/data.php/Location",header);
  }

  getLevel(){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
    };
    return this.http.get(API.ApiUrl + "/data.php/MsUserlevel",header);
  }

  changeUser(usrId, usrPass, usrName, lvlId, locId, active, act){
    var input = { "usr_id": usrId, "usr_password" : usrPass, "usr_name" : usrName, "lvl_id" : lvlId, "loc_id" : locId, "usr_active" : active, "action" : act };
    // console.log(input);
    var header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.post(API.ApiUrl + "/data.php/MsUser", JSON.stringify(input), header);
  }

//   signApp(){
//     var input={"id": LocalData.getAppId(), "device": 'Browser'};
//     return this.http.post(API.ApiUrl + "/login.php/SignApp", input);
//   }
 
}
