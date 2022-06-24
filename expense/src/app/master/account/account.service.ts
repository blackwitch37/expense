import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../data/API';
import { LocalData } from '../../data/LocalData';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) {

  }

  getAccount(location){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
    };
    return this.http.get(API.ApiUrl + "/data.php/MsAccount?location="+location,header);
  }

  changeAcc(accId, accDesc, locId, active){
    var input = { "acc_id": accId, "acc_desc": accDesc, "loc_id": locId, "acc_active": active };

    var header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.post(API.ApiUrl + "/data.php/MsAccount", JSON.stringify(input), header);
  }

//   signApp(){
//     var input={"id": LocalData.getAppId(), "device": 'Browser'};
//     return this.http.post(API.ApiUrl + "/login.php/SignApp", input);
//   }
 
}
