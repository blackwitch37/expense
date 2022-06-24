import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalData } from '../../data/LocalData';
import { API } from '../../data/API';

@Injectable()
export class ImportdataService {

  constructor(private http: HttpClient) {

  }

  postFile(fileToUpload: File, date:string, time:string, user:string) {
    var endpoint=API.ApiUrl+"/data.php/ImportData";
    // if(user == 'bi'){
    //     endpoint = API.ApiUrl+"/data.php/InvProductBi";
    // }else if(user == 'kam'){
    //     endpoint = API.ApiUrl+"/data.php/InvProductKam";
    // }
    const formData: FormData = new FormData();
    var filename = user+"_"+date+"_"+time+"_"+fileToUpload.name;
    // var header = {
    //   headers: new HttpHeaders().set('Content-Type', 'application/json')
    // };    
    var header = {
      headers: new HttpHeaders().set('token', LocalData.getToken())
      .set('userId',LocalData.getUser())
    };
    formData.append('file', fileToUpload, filename);
    return this.http
      .post(endpoint, formData, header)
      .pipe(map(() => { return true; }));
  }



//   signApp(){
//     var input={"id": LocalData.getAppId(), "device": 'Browser'};
//     return this.http.post(API.ApiUrl + "/login.php/SignApp", input);
//   }
 
}
