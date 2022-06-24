import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../data/API';
import { LocalData } from '../../data/LocalData';

@Injectable()
export class UserlevelService {

  constructor(private http: HttpClient) {

  }

  getLevel(){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
    };
    return this.http.get(API.ApiUrl + "/data.php/MsUserlevel",header);
  }

  changeLevel(lvlId, lvlName, lvlDesc, active, act){
    var input = { "lvl_id": lvlId, "lvl_name": lvlName, "lvl_desc": lvlDesc, "lvl_active": active, "action": act };

    var header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.post(API.ApiUrl + "/data.php/MsUserlevel", JSON.stringify(input), header);
  }

//   signApp(){
//     var input={"id": LocalData.getAppId(), "device": 'Browser'};
//     return this.http.post(API.ApiUrl + "/login.php/SignApp", input);
//   }
 
}
