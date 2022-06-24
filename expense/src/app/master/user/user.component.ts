import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../containers/default-layout/default-layout.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LocalData } from '../../data/LocalData';
import { UserService } from './user.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit, OnInit {

  myDate = new Date();
  date:any;
  time:any;
  role:any=LocalData.getRole();
  userId:any=LocalData.getUser();

  constructor(private UserService : UserService, private router: Router, private headers: DefaultLayoutComponent,) { }

  @ViewChild(DataTableDirective) DataTableDirective:DataTableDirective;
  
  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  resetter: Subject<any> = new Subject<any>();
  isDtInitialized:boolean = false;
  userList:any;
  levelList:any;
  locationList:any;
  success:any=null;
  alertsDismiss: any = [];
  message:any;
  res:any;
  validator:any=false;
  loc:any=LocalData.getLocation();
  editSelected:any={
      usr_id: null,
      usr_name: null,
      usr_pass: null,
      lvl_id: null,
      loc_id: null,
      usr_active: null
    };

  ngOnInit(): void {
    
    if(LocalData.isAuthenticate()==false){
      this.router.navigateByUrl('');
    }
    this.role = CryptoJS.enc.Base64.parse(this.role);
    this.role = CryptoJS.enc.Utf8.stringify(this.role).toString();
    this.dtOptions = {
      pagingType: 'full_numbers',
      destroy: true,
      pageLength: 10
    };
    
    this.date = this.myDate.toLocaleDateString();
    this.time = this.myDate.toLocaleTimeString();
    this.date = this.date.replaceAll('/','_');
    this.time = this.time.replaceAll(' ','_');
    this.time = this.time.replaceAll(':','_');
    this.userList=null;
    this.res=null;
    this.getLevel();
    this.getLocation();
  }

  ngAfterViewInit(): void {
    this.userList=null;
    this.res=null;
    if(this.isDtInitialized){
      this.rerender();
    }
    this.headers.changeLoc$.subscribe(resultLoc => {
      if(this.loc!=resultLoc){
        this.loc = resultLoc;
      }
      this.getUser();
      console.log('This is the updated changeLocafter: ', resultLoc);
    });
    
  }

  getLocation():void{
    this.locationList=null;
    this.res=null;
    this.UserService.getLocation().subscribe(data => {
      this.res=data;
      this.locationList=this.res.data;
    }, error => {
      this.success=false;
      this.alertsDismiss.push({
        type: 'danger',
        msg: 'fail',
        timeout: 2000
      });
      console.log(error);
    });
  }

  getLevel():void{
    this.levelList=null;
    this.res=null;
    this.UserService.getLevel().subscribe(data => {
      this.res=data;
      this.levelList=this.res.data;
    }, error => {
      this.success=false;
      this.alertsDismiss.push({
        type: 'danger',
        msg: 'fail',
        timeout: 2000
      });
      console.log(error);
    });
  }

  getUser():void{
    this.userList=null;
    this.res=null;
    this.modalAdd.hide();
    this.modalEdit.hide();
    this.UserService.getUser().then(data => {
      this.res=data;
      this.userList=this.res.data;
      if(this.res.success){
        this.success=true;
        this.alertsDismiss.push({
          type: 'info',
          msg: this.res.message,
          timeout: 2000
        });
        this.dtTrigger.next();
      }else{
        this.success=false;
        this.alertsDismiss.push({
          type: 'danger',
          msg: this.res.message,
          timeout: 2000
        });
      }
    }, error => {
      this.success=false;
      this.alertsDismiss.push({
        type: 'danger',
        msg: 'fail',
        timeout: 2000
      });
      console.log(error);
    });
  }

  rerender(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onClosedSuccess(dismissedAlert: any): void {
    this.alertsDismiss = this.alertsDismiss.filter(alert => alert !== dismissedAlert);
  }
  //upload funct

  //add or edit funct
  saveUser(t,usrId,usrPass,usrName,lvlId,locId,act){
    if(this.validator==false && act =='insert'){
      this.alertsDismiss.push({
        type: 'danger',
        msg: "Password didn't match!",
        timeout: 2000
      });
      return;
    }
    var tf = t;
    var actived:any;
    if(tf){
      actived = 1;
    }else if(!tf){
      actived = 0;
    }else{
      actived = t;
    }
    this.UserService.changeUser(usrId,usrPass,usrName,lvlId,locId,actived,act).subscribe(data => {
      this.res=data;
      if(this.res.success){
        this.success=true;
        this.alertsDismiss.push({
          type: 'info',
          msg: this.res.message,
          timeout: 2000
        });
        this.getUser();
      }else{
        this.success=false;
        this.alertsDismiss.push({
          type: 'danger',
          msg: this.res.message,
          timeout: 2000
        });
      }
    }, error => {
      this.success=false;
      this.alertsDismiss.push({
        type: 'danger',
        msg: 'fail',
        timeout: 2000
      });
      console.log(error);
    });
  }

  editUser(index){
    this.editSelected=[];
    // console.log(index);
    this.editSelected=this.userList[index];
    // console.log(this.editSelected);
    this.modalEdit.show();
  }
  //add or edit funct
  validatePass(x,y){
    if(x!=y){
      this.validator=false;
    }else{
      this.validator=true;
    }
  }
}
