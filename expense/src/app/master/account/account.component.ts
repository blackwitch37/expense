import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../containers/default-layout/default-layout.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LocalData } from '../../data/LocalData';
import { AccountService } from './account.service';
import { ImportaccountService } from '../../import/importaccount/importaccount.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements AfterViewInit, OnInit {
  fileToUpload: File = null;
  myDate = new Date();
  date:any;
  time:any;
  role:any=LocalData.getRole();
  
  constructor(private AccountService : AccountService, private router: Router, private headers: DefaultLayoutComponent, private importService: ImportaccountService) { 
    
  }
  @ViewChild(DataTableDirective) DataTableDirective:DataTableDirective;
  
  @ViewChild('modalUpload') public modalUpload: ModalDirective;
  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  resetter: Subject<any> = new Subject<any>();
  isDtInitialized:boolean = false;
  accountList:any;
  success:any=null;
  alertsDismiss: any = [];
  message:any;
  res:any;
  loc:any=LocalData.getLocation();
  accPrefix:any=1;
  editSelected:any={
      acc_id: null,
      acc_desc: null,
      acc_active: null,
      loc_id: null
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
    this.accountList=null;
    this.res=null;
  }

  ngAfterViewInit(): void {
    this.accountList=null;
    this.res=null;
    // console.log(this.isDtInitialized);
    if(this.isDtInitialized){
      this.rerender();
    }
    this.headers.changeLoc$.subscribe(resultLoc => {
      if(this.loc!=resultLoc){
        this.loc = resultLoc;
      }
      // if(this.isDtInitialized){
      //   this.rerender();
      // }
      this.getAccount(this.loc);
      console.log('This is the updated changeLocafter: ', resultLoc);
    });
    
  }

  getAccount(loc):void{
    this.accountList=null;
    this.res=null;
    this.modalAdd.hide();
    this.modalEdit.hide();
    this.modalUpload.hide();
    this.AccountService.getAccount(loc).subscribe(data => {
      // if(this.isDtInitialized){
      //   // this.rerender();
      // }else{
      //   this.dtTrigger.next();
      // }
      // this.isDtInitialized=true;
      this.res=data;
      this.accountList=this.res.data;
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


  //upload funct
  handleFileImportAccount(files: FileList) {
    this.fileToUpload = files.item(0);
  }


  resetFile(files){
    this.fileToUpload = null;
    files.value='';
    this.modalAdd.hide();
    this.modalEdit.hide();
    this.modalUpload.hide();
    this.getAccount(this.loc);
  }

  uploadFileToActivity(files) {
    this.success=null;
    this.message='';
    this.alertsDismiss=[];
    if(files.value==''){
      this.success=false;
      this.alertsDismiss.push({
        type: 'warning',
        msg: "Please attach the document!",
        timeout: 2000
      });
      this.resetFile(files);
      return;
    }
    this.importService.postFile(this.fileToUpload,this.date,this.time,this.role).subscribe(data => {
      // do something, if upload success
      this.message=data;
      this.success=null;
      this.alertsDismiss=[];
      if(this.message.success==true){
        this.success=true;
        this.alertsDismiss.push({
          type: 'success',
          msg: this.message.message + ` (success import at: ${new Date().toLocaleTimeString()})`,
          timeout: 2000
        });
        this.resetFile(files);
      }else{
        this.success=false;
        this.alertsDismiss.push({
          type: 'danger',
          msg: this.message.message + ` (error import at: ${new Date().toLocaleTimeString()})`,
          timeout: 2000
        });
        this.resetFile(files);
      }
      this.fileToUpload = null;
      files.value='';
    }, error => {
        this.success=false;
        this.alertsDismiss.push({
          type: 'danger',
          msg: this.message.message + ` (error import at: ${new Date().toLocaleTimeString()})`,
          timeout: 2000
        });
        console.log(error);
    });
  }

  onClosedSuccess(dismissedAlert: any): void {
    this.alertsDismiss = this.alertsDismiss.filter(alert => alert !== dismissedAlert);
  }
  //upload funct

  //add or edit funct
  saveAcc(t,accId,accDesc,locId){
    var tf = t;
    var actived:any;
    if(tf){
      actived = 1;
    }else if(!tf){
      actived = 0;
    }else{
      actived = t;
    }
    this.AccountService.changeAcc(accId,accDesc,locId,actived).subscribe(data => {
      this.res=data;
      if(this.res.success){
        this.success=true;
        this.alertsDismiss.push({
          type: 'info',
          msg: this.res.message,
          timeout: 2000
        });
        this.getAccount(this.loc);
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

  editAcc(index){
    this.editSelected=[];
    // console.log(index);
    this.editSelected=this.accountList[index];
    console.log(this.editSelected);
    this.modalEdit.show();
  }
  setPrefix(p){
    this.accPrefix = p;
  }
  //add or edit funct
}
