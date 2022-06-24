import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalData } from '../../data/LocalData';

@Component({
  selector: 'app-importdata',
  templateUrl: './importdata.component.html',
  styleUrls: ['./importdata.component.scss']
})
export class ImportdataComponent implements OnInit {

  fileToUpload: File = null;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(LocalData.isAuthenticate()==false){
      this.router.navigateByUrl('');
    }
  }

  handleFileImportAccount(files: FileList) {
    this.fileToUpload = files.item(0);
    // console.log(files);
    // this.uploadFileToActivity(this.date, this.time, this.role);
  }

}
