import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../containers/default-layout/default-layout.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LocalData } from '../../data/LocalData';
import { LocationService } from './location.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements AfterViewInit, OnInit {

  myDate = new Date();
  date:any;
  time:any;
  role:any=LocalData.getRole();

  constructor(private LocationService : LocationService, private router: Router, private headers: DefaultLayoutComponent,) { }

  @ViewChild(DataTableDirective) DataTableDirective:DataTableDirective;
  
  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  resetter: Subject<any> = new Subject<any>();
  isDtInitialized:boolean = false;
  locationList:any;
  success:any=null;
  alertsDismiss: any = [];
  message:any;
  res:any;
  loc:any=LocalData.getLocation();
  editSelected:any={
      loc_id: null,
      loc_desc: null,
      loc_active: null
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
    this.locationList=null;
    this.res=null;
  }

  ngAfterViewInit(): void {
    this.locationList=null;
    this.res=null;
    if(this.isDtInitialized){
      this.rerender();
    }
    this.headers.changeLoc$.subscribe(resultLoc => {
      if(this.loc!=resultLoc){
        this.loc = resultLoc;
      }
      this.getLocation();
      console.log('This is the updated changeLocafter: ', resultLoc);
    });
    
  }

  getLocation():void{
    this.locationList=null;
    this.res=null;
    this.modalAdd.hide();
    this.modalEdit.hide();
    this.LocationService.getLocation().subscribe(data => {
      this.res=data;
      this.locationList=this.res.data;
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
  saveLoc(t,locId,locName,locDesc,act){
    var tf = t;
    var actived:any;
    if(tf){
      actived = 1;
    }else if(!tf){
      actived = 0;
    }else{
      actived = t;
    }
    this.LocationService.changeLoc(locId,locName,locDesc,actived,act).subscribe(data => {
      this.res=data;
      if(this.res.success){
        this.success=true;
        this.alertsDismiss.push({
          type: 'info',
          msg: this.res.message,
          timeout: 2000
        });
        // this.getLocation();
      }else{
        this.success=false;
        this.alertsDismiss.push({
          type: 'danger',
          msg: this.res.message,
          timeout: 2000
        });
      }
      // this.router.navigateByUrl('/master/location');
      // this.router.navigateByUrl('/master/location', {skipLocationChange: true});
      
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
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

  editLoc(index){
    this.editSelected=[];
    // console.log(index);
    this.editSelected=this.locationList[index];
    console.log(this.editSelected);
    this.modalEdit.show();
  }
  //add or edit funct
}

