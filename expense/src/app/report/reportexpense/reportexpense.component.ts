import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../containers/default-layout/default-layout.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LocalData } from '../../data/LocalData';
import { ReportexpenseService } from './reportexpense.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';

import { IDateRange, IDateRangePickerOptions, DateRangePickerComponent } from 'ngx-daterange';


@Component({
  selector: 'app-reportexpense',
  templateUrl: './reportexpense.component.html',
  styleUrls: ['./reportexpense.component.scss']
})
export class ReportexpenseComponent implements AfterViewInit, OnInit {

  @ViewChild('dateRangePicker', { static: true })
  dateRangePicker: DateRangePickerComponent;
  firstFieldEmittedValue: IDateRange;
  firstFieldOptions: IDateRangePickerOptions = {
    autoApply: true,
    clickOutsideAllowed: false,
    format: 'YYYY-MM-DD',
    minDate: moment().subtract(10, 'years'),
    maxDate: moment().add(3, 'years'),
    labelText:'Select Date',
    validators: Validators.required,
  }


  myDate = new Date();
  date:any;
  time:any;
  role:any='';
  startDate:any;
  endDate:any;
  selectedAccount:any='ALL';
  lastBalancer:any;

  constructor(private ReportexpenseService : ReportexpenseService, private router: Router, private headers: DefaultLayoutComponent,) { }


  @ViewChild(DataTableDirective, {static: false})
  
  dtElement: DataTableDirective;
  dtOptions= {};
  dtTrigger: Subject<any> = new Subject<any>();
  resetter: Subject<any> = new Subject<any>();
  isDtInitialized:boolean = false;
  reportList:any;
  accountList:any;
  success:any=null;
  alertsDismiss: any = [];
  message:any;
  res:any;
  loc:any=LocalData.getLocation();

  ngOnInit(): void {
    
    if(LocalData.isAuthenticate()==false){
      this.router.navigateByUrl('');
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      destroy: true,
      pageLength: 10,
      renderer:true,
      responsive:true,
      dom: 'Bfrtip',
      columnDefs:[
        { 
          targets: 5,
          className: "numberRight",
          render: $.fn.dataTable.render.number(',', '.', 0, '')
        },
        { 
          targets: 6,
          className: "numberRight",
          render: $.fn.dataTable.render.number(',', '.', 0, '')
        },
        { 
          targets: 7,
          className: "numberRight",
          render: $.fn.dataTable.render.number(',', '.', 0, '')
        }
      ],
      buttons: [
        'colvis',
        {
            extend: 'copyHtml5',
            exportOptions: {
                columns: [ 0, ':visible' ]
            }
        },
        'csv',
        {
            extend: 'excelHtml5',
            exportOptions: {
                columns: ':visible'
            }
        },
        {
            extend: 'print',
            exportOptions: {
                columns: [0,1,2,3,4,5,6]
            }
        }
      ]
    };
    
    this.date = this.myDate.toLocaleDateString();
    this.time = this.myDate.toLocaleTimeString();
    this.date = this.date.replaceAll('/','_');
    this.time = this.time.replaceAll(' ','_');
    this.time = this.time.replaceAll(':','_');
    
    var dd = (this.myDate.getDate()).toString().padStart(2, '0');
    var mm = (this.myDate.getMonth() + 1).toString().padStart(2, '0'); //January is 0!
    var yyyy = this.myDate.getFullYear();
    this.date = yyyy + '-' + mm + '-' + dd;
    // console.log(this.date);
    this.startDate = this.getStartDate();
    this.endDate = this.getEndDate();
    this.reportList=null;
    this.res=null;
    this.getAccount(this.loc);
  }

  ngAfterViewInit(): void {
    this.reportList=null;
    this.res=null;
    if(this.isDtInitialized){
      this.rerender();
    }
    this.headers.changeLoc$.subscribe(resultLoc => {
      if(this.loc!=resultLoc){
        this.loc = resultLoc;
      }
      this.getReport(this.startDate, this.endDate, this.selectedAccount);
      console.log('This is the updated changeLocafter: ', resultLoc);
    });
    
  }

  getAccount(loc):void{
    this.accountList=[];
    this.res=null;
    var x = {
      acc_active: "1",
      acc_createDate: "2022-01-25 10:55:48",
      acc_createUser: "administrator",
      acc_desc: "ALL",
      acc_id: "ALL",
      acc_updateDate: "2022-01-25 14:27:08",
      acc_updateUser: "administrator",
      loc_id: "1"
    };
    this.accountList.push(x);
    this.ReportexpenseService.getAccount(loc).subscribe(data => {
      this.res=data;
      this.accountList=this.res.data;
      this.accountList.unshift(x);
      this.accountList.forEach(acc => {
        acc.acc_full = acc.acc_id + ' - ' + acc.acc_desc;        
      });
      if(this.res.success){
        this.success=true;
      }else{
        this.success=false;
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

  getReport(start,end,acc):void{
    this.reportList=null;
    this.res=null;
    this.lastBalancer=0;
    this.ReportexpenseService.getReport(start,end,acc,this.loc).subscribe(data => {
      this.res=data;
      this.reportList=this.res.data;
      this.reportList.forEach(rpt => {
        if(rpt.trx_type=='d'){
          this.lastBalancer += Number(rpt.trx_value);
        }else{
          this.lastBalancer -= Number(rpt.trx_value);
        }
          rpt.lastBalance=this.lastBalancer;
      });
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

  onRangeSelected(a){
    this.startDate = this.convertDate(a.start._d);
    this.endDate = this.convertDate(a.end._d);
    this.getReport(this.startDate,this.endDate,this.selectedAccount);
  }
  onAccountSelected(a){
    this.selectedAccount = a;    
    this.getReport(this.startDate,this.endDate,this.selectedAccount);
  }

  convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  getStartDate(){
    return this.date;
    // return "2022-01-27";
  }

  getEndDate(){
    return this.date;
    // return "2022-01-27";
  }
}