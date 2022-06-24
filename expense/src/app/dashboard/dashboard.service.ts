import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../data/API';
import { LocalData } from '../data/LocalData';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) {

  }

  getAktiva(location){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.get(API.ApiUrl + "/report.php/sumAktiva?location="+location,header);
  }

  getKewajiban(location){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.get(API.ApiUrl + "/report.php/sumKewajiban?location="+location,header);
  }

  getEkuitas(location){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.get(API.ApiUrl + "/report.php/sumEkuitas?location="+location,header);
  }

  getPendapatan(location){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.get(API.ApiUrl + "/report.php/sumPendapatan?location="+location,header);
  }
  
  getPengeluaran(location){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.get(API.ApiUrl + "/report.php/sumPengeluaran?location="+location,header);
  }
  
  getDepresiasi(location){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.get(API.ApiUrl + "/report.php/sumDepresiasi?location="+location,header);
  }
  
  getPengLain(location){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.get(API.ApiUrl + "/report.php/sumPengLain?location="+location,header);
  }
  
  getExpense(location, dates){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    return this.http.get(API.ApiUrl + "/report.php/Expense?location="+location+"&date="+dates,header);
  }

  getAccount(location){
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
    };
    return this.http.get(API.ApiUrl + "/data.php/Account?location="+location,header);
  }

}
