import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { DefaultLayoutComponent } from '../../containers/default-layout/default-layout.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LocalData } from '../../data/LocalData';
import { ExpenseService } from './expense.service';
// import { AccountService } from '../../master/account/account.service';
// import { ImportaccountService } from '../../import/importaccount/importaccount.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import * as CryptoJS from 'crypto-js';

export interface User {
  name: string;
}

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit, AfterViewInit {
 
  fileToUpload: File = null;
  myDate = new Date();
  date:any;
  time:any;
  role:any=LocalData.getRole();
  
  // month:any=null;
  // months: any = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // mnth: number = new Date().getMonth()+1;
  // mnth: number = 12;
  // selectedYear: number = new Date().getFullYear();
  // selectedMonth:any = this.months[this.mnth-1];
  // selectedDay:any = new Date().getDate();
  selectedDate:any;
  constructor(private expenseService:ExpenseService, private router: Router, private headers: DefaultLayoutComponent, public decimalpipe:DecimalPipe, public datepipe: DatePipe, private configSelect: NgSelectConfig) { }

  @ViewChild(DataTableDirective) DataTableDirective:DataTableDirective;
  
  @ViewChild('modalUpload') public modalUpload: ModalDirective;
  @ViewChild('modalAdd') public modalAdd: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  dtElement: DataTableDirective;
  dtOptions= {};
  dtTrigger: Subject<any> = new Subject<any>();
  resetter: Subject<any> = new Subject<any>();
  isDtInitialized:boolean = false;
  accountList:any;
  expenseList:any;
  success:any=null;
  alertsDismiss: any = [];
  message:any;
  res:any;
  loc:any=LocalData.getLocation();
  selectedAccount:any;
  selectedDebit:any;
  selectedCredit:any;
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
    if(this.role=='administrator'){
      var visible = true;
    }else{
      var visible = false;
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
          targets: 6,
          className: "numberRight",
          render: $.fn.dataTable.render.number(',', '.', 0, '')
        },
        { 
          targets: 2,
          className: "numberRight"
        },
        { 
          targets: 7,
          visible: visible
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
    this.date = this.date.replaceAll('/','-');
    this.date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.selectedDate = this.date;
    this.time = this.time.replaceAll(' ','_');
    this.time = this.time.replaceAll(':','_');
    // console.log(this.date);
    this.expenseList=null;
    this.accountList=null;
    this.res=null;
    this.getAccount(this.loc);
  }

  ngAfterViewInit(): void {
    
    this.expenseList=null;
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
      this.getExpense(this.loc, this.selectedDate);
      console.log('This is the updated changeLocafter: ', resultLoc);
    });
    
  }

  getExpense(loc, dt):void{
    this.expenseList=null;
    this.res=null;
    this.modalUpload.hide();
    this.modalAdd.hide();
    this.modalEdit.hide();
    this.expenseService.getExpense(loc, dt).subscribe(data => {
      this.res=data;
      this.expenseList=this.res.data;
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

  saveExp(trxId,date,desc,type,value,act){
    this.res=null;
    this.expenseService.saveExpense(trxId,date,this.selectedAccount,desc,type,value,this.loc,1).subscribe(data => {
      this.res=data;
      if(this.res.success){
        this.success=true;
        this.alertsDismiss.push({
          type: 'info',
          msg: this.res.message,
          timeout: 4000
        });
      }else{
        this.success=false;
        this.alertsDismiss.push({
          type: 'danger',
          msg: this.res.message,
          timeout: 4000
        });
      }
      this.getExpense(this.loc, date);
      this.modalAdd.hide();
    }, error => {
      this.success=false;
      this.alertsDismiss.push({
        type: 'danger',
        msg: 'fail to get data',
        timeout: 4000
      });
      console.log(error);
    });
  }

  editTrx(index){
    this.editSelected=[];
    // console.log(index);
    this.editSelected=this.expenseList[index];
    this.selectedAccount=this.editSelected.acc_id;
    this.selectedDate=this.editSelected.trx_date;
    if(this.editSelected.trx_type=='c'){
      this.selectedDebit='selected';
    }else{
      this.selectedCredit='selected';
    }
    console.log(this.selectedDate);
    this.modalEdit.show();
  }

  getAccount(loc):void{
    this.accountList=null;
    this.res=null;
    this.expenseService.getAccount(loc).subscribe(data => {
      this.res=data;
      this.accountList=this.res.data;
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

  rerender(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      console.log(dtInstance);
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  onClosedSuccess(dismissedAlert: any): void {
    this.alertsDismiss = this.alertsDismiss.filter(alert => alert !== dismissedAlert);
  }
  
  dateChange(d){
    this.selectedDate = d;
    // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) =>{
    //   console.log(dtInstance);
    // });
    this.getExpense(this.loc, this.selectedDate);
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
        timeout: 4000
      });
      this.modalUpload.hide();
      this.resetFile(files);
      return;
    }
    this.expenseService.postFile(this.fileToUpload,this.date,this.time,this.role).subscribe(data => {
      // do something, if upload success
      this.message=data;
      this.success=null;
      this.alertsDismiss=[];
      if(this.message.success==true){
        this.success=true;
        this.alertsDismiss.push({
          type: 'success',
          msg: this.message.message + ` (success import at: ${new Date().toLocaleTimeString()})`,
          timeout: 4000
        });
        this.resetFile(files);
        this.getExpense(this.loc, this.date);
      }else{
        this.success=false;
        this.alertsDismiss.push({
          type: 'danger',
          msg: this.message.message + ` (error import at: ${new Date().toLocaleTimeString()})`,
          timeout: 4000
        });
        this.resetFile(files);
        this.getExpense(this.loc, this.date);
      }
      this.fileToUpload = null;
      files.value='';
    }, error => {
        this.success=false;
        this.alertsDismiss.push({
          type: 'danger',
          msg: this.message.message + ` (error import at: ${new Date().toLocaleTimeString()})`,
          timeout: 4000
        });
        console.log(error);
    });
  }
  //upload funct
  
}
