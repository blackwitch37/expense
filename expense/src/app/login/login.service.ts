import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../data/API';
import * as CryptoJS from 'crypto-js';
import { buffer } from 'rxjs/operators';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {

  }

  signIn(username,pass) {
    
    
    // // var key = '57fFKNcRBziv232t5aNjUx3mBwY'+pass;
    // var key = '57fFKNcRBziv'+pass;
    // // var key = '3792'+pass;
    // if(key.length>16){
    //   key = key.substring(0,16);
    //   console.log(key);
    // }
    // if(pass.length<16){
    //   //tambahin pass length nya
    // }

    // var passHex='';
    // var keyHex='';
    // var ivHex='';
    // for(var i=0;i<key.length;i++) {
    //   keyHex += ''+key.charCodeAt(i).toString(16);
    // }

    // var iv = CryptoJS.lib.WordArray.random(4).toString();
    // console.log(iv.toString());
    // for(var i=0;i<iv.length;i++) {
    //   ivHex += ''+iv.charCodeAt(i).toString(16);
    // }
    
    // for(var i=0;i<pass.length;i++) {
    //   passHex += ''+pass.charCodeAt(i).toString(16);
    // }

    // // iv = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(iv));
    // keyHex = CryptoJS.enc.Hex.parse(keyHex);
    // console.log(keyHex+' keyHex');
    // ivHex = CryptoJS.enc.Hex.parse(ivHex);
    // console.log(ivHex+' ivHex');
    // passHex = CryptoJS.enc.Hex.parse(passHex);
    // console.log(passHex+' passHex');
    // // console.log(iv+' - iv Base64');
    // // var passB64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(pass));
    // // console.log(passB64+' - password Base64 (1)');
    
    // var password = CryptoJS.AES.encrypt(
    //   {ciphertext: passHex},
    //   keyHex,
    //   {
    //     iv:ivHex,
    //     padding:CryptoJS.pad.NoPadding
    //   }
    // ).toString(CryptoJS.enc.Hex);
    // console.log(password+' - password AES encrypt');
    // // password = CryptoJS.enc.Hex.parse(password);
    // // console.log(password.algorithm.encryptBlock+' - password algorithm');
    // // console.log(password.formatter.parse+' - password formatter');
    // // console.log(password.mode.Encryptor.processBlock+' - password mode');
    // // console.log(password.padding+' - password padding');
    // // console.log(password.key.toString()+' - password key');
    // // console.log(password.iv.toString()+' - password iv');
    // // console.log(password.salt+' - password salt');
    // // console.log(password.ciphertext.toString()+' - password ciphertext');
    // // var passB64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
    // // console.log(passB64+' - password Base64 (1)');
    // // key = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(key));
    // // console.log(key+' - key Base64 (2)');
    // // password = iv+''+key+''+password;
    // // console.log(password+' - iv + key + password AES');
    // // password = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
    // // console.log(password+' - iv Base64 + key Base64 + password AES to Base64');

    var password =  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(pass));

    var input = { "username": username , "password": password };

    var header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    // var header = {
    //   headers: new HttpHeaders().set('Content-Type', 'application/json').
    //   set('id', LocalData.getAppId())
    // };
    // return this.http.post(API.ApiUrl + "/location.php/login", JSON.stringify(input), header);
    return this.http.post(API.ApiUrl + "/login.php", JSON.stringify(input), header);
  }


//   signApp(){
//     var input={"id": LocalData.getAppId(), "device": 'Browser'};
//     return this.http.post(API.ApiUrl + "/login.php/SignApp", input);
//   }
 
}
