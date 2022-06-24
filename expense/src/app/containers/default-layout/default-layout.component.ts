import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';
// import * as globalAccount from '../../master/account/account.component';
import { LocalData } from '../../data/LocalData';
import { DefaultLayoutService } from './default-layout.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  public username = LocalData.getName();
  public role = LocalData.getRole();
  public selectedLocation :any = LocalData.getLocation();
  public location = null;
  public resLoc = null;
  message:any;
  
  
  private changeLoc: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.selectedLocation);
  public changeLoc$: Observable<any[]> = this.changeLoc.asObservable();

  
  constructor(private DefaultLayoutService : DefaultLayoutService, private router: Router) {
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }


  ngOnInit(): void {
    this.getLocations();
    this.role = CryptoJS.enc.Base64.parse(this.role);
    this.role = CryptoJS.enc.Utf8.stringify(this.role).toString();
    // console.log(this.role);
    // if(this.selectedLocation==null){
    //   this.selectedLocation=1;
    // }
    LocalData.setLocation(this.selectedLocation);
    if (!LocalData.getMenu()) {
      LocalData.setMenu(LocalData.getRole());
      location.reload();
    }
  }
  
  getLocations(){
    this.message='';
    this.DefaultLayoutService.getLocations().subscribe(data => {
      // do something, if upload success
      this.resLoc=data;
      if(this.resLoc.success==true){
        this.location=this.resLoc.data;
        // console.log(this.location);
      }else{ 
        alert("Token Expired/Not Match! Please Relogin");
        this.router.navigateByUrl('');
      }
    });
  }

  updateLoc(updatedList) {
    if(updatedList==null){
      updatedList=this.location;
    }
    this.changeLoc.next(updatedList);
  }

  setLocation(location){
    LocalData.setLocation(location);
    this.updateLoc(location);
    // globalAccount.AccountComponent.call(this.selectedLocation);
  }


}
