import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../containers/default-layout/default-layout.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LocalData } from '../../data/LocalData';
import { UserlevelService } from './userlevel.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-userlevel',
  templateUrl: './userlevel.component.html',
  styleUrls: ['./userlevel.component.scss']
})
export class UserlevelComponent implements AfterViewInit, OnInit {

  myDate = new Date();
  date:any;
  time:any;
  role:any=LocalData.getRole();

  constructor(private UserlevelService : UserlevelService, private router: Router, private headers: DefaultLayoutComponent,) { }

  @ViewChild(DataTableDirective) DataTableDirective:DataTableDirective;
  
  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  resetter: Subject<any> = new Subject<any>();
  isDtInitialized:boolean = false;
  levelList:any;
  success:any=null;
  alertsDismiss: any = [];
  message:any;
  res:any;
  loc:any=LocalData.getLocation();
  editSelected:any={
      lvl_id: null,
      lvl_name: null,
      lvl_desc: null,
      lvl_active: null
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
    this.levelList=null;
    this.res=null;
  }

  ngAfterViewInit(): void {
    this.levelList=null;
    this.res=null;
    if(this.isDtInitialized){
      this.rerender();
    }
    this.headers.changeLoc$.subscribe(resultLoc => {
      if(this.loc!=resultLoc){
        this.loc = resultLoc;
      }
      this.getLevel();
      console.log('This is the updated changeLocafter: ', resultLoc);
    });
    
  }

  getLevel():void{
    this.levelList=null;
    this.res=null;
    this.modalAdd.hide();
    this.modalEdit.hide();
    this.UserlevelService.getLevel().subscribe(data => {
      this.res=data;
      this.levelList=this.res.data;
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
  saveLvl(t,lvlId,lvlName,lvlDesc,act){
    var tf = t;
    var actived:any;
    if(tf){
      actived = 1;
    }else if(!tf){
      actived = 0;
    }else{
      actived = t;
    }
    this.UserlevelService.changeLevel(lvlId,lvlName,lvlDesc,actived,act).subscribe(data => {
      this.res=data;
      if(this.res.success){
        this.success=true;
        this.alertsDismiss.push({
          type: 'info',
          msg: this.res.message,
          timeout: 2000
        });
        this.getLevel();
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

  editLvl(index){
    this.editSelected=[];
    // console.log(index);
    this.editSelected=this.levelList[index];
    console.log(this.editSelected);
    this.modalEdit.show();
  }
  //add or edit funct
}


