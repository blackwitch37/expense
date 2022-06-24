import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }    from '@angular/router';
import { LocalData } from '../data/LocalData';

@Injectable()
export class AuthGuardService implements CanActivate {

  canActivate() {
    return true;
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var url=state.url;
    return true;
    // if(url== "/yuser"){
    //   if(LocalData.getRole()=='-'){
    //     return false;
    //   }else{
    //     console.log(LocalData.getRole());
    //     return true;
    //   }
    // }if(url== "/yuser/"){
    //   if(LocalData.getRole()=='-'){
    //     return false;
    //   }else{
    //     console.log(LocalData.getRole());
    //     return true;
    //   }
    // }else if(url== "/yuser/shopee"){
    //   if(LocalData.getRole()=='kam'){
    //     return false;
    //   }else{
    //     return true;
    //   }
    // }else if(url== "/yuser/tokopedia"){
    //   if(LocalData.getRole()=='kam'){
    //     return false;
    //   }else{
    //     return true;
    //   }
    // }else if(url== "/yuser/lazada"){
    //   if(LocalData.getRole()=='kam'){
    //     return false;
    //   }else{
    //     return true;
    //   }
    // }else if(url== "/yuser/bukalapak"){
    //   if(LocalData.getRole()=='kam'){
    //     return false;
    //   }else{
    //     return true;
    //   }
    // }else if(url== "/yuser/blibli"){
    //   if(LocalData.getRole()=='kam'){
    //     return false;
    //   }else{
    //     return true;
    //   }
    // }else if(url== "/yuser/jdid"){
    //   if(LocalData.getRole()=='kam'){
    //     return false;
    //   }else{
    //     return true;
    //   }
    // }else if(url== "/yuser/zalora"){
    //   if(LocalData.getRole()=='kam'){
    //     return false;
    //   }else{
    //     return true;
    //   }
    // }else if(url== "/yuser/avgprice"){
    //   if(LocalData.getRole()=='user'){
    //     return false;
    //   }else{
    //     return true;
    //   }
    // }else if(url== "/yuser/user"){
    //   if(LocalData.getRole()!='admin'){
    //     return false;
    //   }else{
    //     return true;
    //   }
    // }else{
    //   return false;
    // }
  }

}
