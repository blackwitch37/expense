import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalData } from '../../data/LocalData';
import { ImportaccountService } from './importaccount.service';

@Component({
  selector: 'app-importaccount',
  templateUrl: './importaccount.component.html',
  styleUrls: ['./importaccount.component.scss']
})
export class ImportaccountComponent implements OnInit {

  constructor(private uploadService : ImportaccountService, private router: Router) { }

  fileToUpload: File = null;
  myDate = new Date();
  date:any;
  time:any;
  role:any='';
  success:any=null;
  message:any;
  alertsDismiss: any = [];

  ngOnInit(): void {
    if(LocalData.isAuthenticate()==false){
      this.router.navigateByUrl('');
    }
    
    this.alertsDismiss.push({
      type: null,
      msg: null
    });
    this.date = this.myDate.toLocaleDateString();
    // this.time = this.myDate.toLocaleTimeString();
    this.time = this.myDate.toLocaleTimeString();
    this.date = this.date.replaceAll('/','_');
    // this.date = this.date.replaceAll(',','');
    this.time = this.time.replaceAll(' ','_');
    this.time = this.time.replaceAll(':','_');
  }

  handleFileImportAccount(files: FileList) {
    this.fileToUpload = files.item(0);
    // console.log(files);
    // this.uploadFileToActivity(this.date, this.time, this.role);
  }


  resetFile(files){
    // console.log(files.value);
    this.fileToUpload = null;
    // var x =(<HTMLInputElement>document.getElementById('file')).value;
    files.value='';
    // this.success=null;
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
    this.uploadService.postFile(this.fileToUpload,this.date,this.time,this.role).subscribe(data => {
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

}
