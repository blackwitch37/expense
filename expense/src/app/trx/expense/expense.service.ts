import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../data/API';
import { LocalData } from '../../data/LocalData';

@Injectable()
export class ExpenseService {

  constructor(private http: HttpClient) {

  }

  getExpense(location, dates){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.get(API.ApiUrl + "/data.php/Expense?location="+location+"&date="+dates,header);
  }

  getAccount(location){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
    };
    return this.http.get(API.ApiUrl + "/data.php/Account?location="+location,header);
  }

  saveExpense(expId, expDate, accId, expDesc, expType, expVal, locId, expActive){
    var input = { "trx_id" : expId, "trx_date" : expDate, "acc_id": accId, "trx_desc": "[EXP]"+expDesc, "trx_type": expType, "trx_value": expVal, "loc_id": locId, "trx_active": expActive };

    var header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.post(API.ApiUrl + "/data.php/Expense", JSON.stringify(input), header);
  }

  postFile(fileToUpload: File, date:string, time:string, user:string) {
    var endpoint=API.ApiUrl+"/data.php/ImportExpense";
    const formData: FormData = new FormData();
    var filename = user+"_"+date+"_"+time+"_"+fileToUpload.name;
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    formData.append('file', fileToUpload, filename);
    return this.http
      .post(endpoint, formData, header);
  }

}
