import { Component, OnInit, SecurityContext, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { LocalData } from '../data/LocalData';
import { LoginService } from './login.service';
// import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginStatus:any=null;
  respon:any;
  messages:any;
  success:any;
  alertsDismiss: any = [];
  dismissible = true;

  constructor(private loginService: LoginService, private router: Router) {
    // this.alertsHtml = this.alertsHtml.map((alert: any) => ({
    //   type: alert.type,
    //   msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    // }));
  }

  ngOnInit(): void {
    LocalData.unsetToken();
    LocalData.unsetUser();
    LocalData.unsetName();
    LocalData.unsetRole();
    LocalData.unsetLocation();
    LocalData.unsetMenu();
    LocalData.setAuthenticate(false);
    this.alertsDismiss.push({
      type: null,
      msg: null
    });
    // LocalData.unsetCompany();
  }

  signIn(username, password): void {
    this.messages=null;
    this.loginStatus=null;
    this.success=null;
    this.loginService.signIn(username,password).subscribe(data => {
      this.respon=data;
      this.success = this.respon.success;
      this.alertsDismiss=[];
      if(this.respon.success==true){
        this.messages = 'Welcome ' + this.respon.data.name + ' (' + this.respon.data.role + ') ';
        // this.toastr.success(this.messages, 'Login');
        LocalData.setAuthenticate(true);
        LocalData.setToken(this.respon.data.token);
        this.loginStatus=true;
        LocalData.setUser(username);
        LocalData.setName(this.respon.data.name);
        LocalData.setRole(this.respon.data.role.toLowerCase());
        LocalData.setLocation(1);
        if(this.respon.data.location != 0){
          LocalData.setLocation(this.respon.data.location);
        }
        this.alertsDismiss.push({
          type: 'success',
          msg: this.messages + ` (login at: ${new Date().toLocaleTimeString()})`,
          timeout: 2000
        });
        // sleep(3);
        // LocalData.setCompany(this.respon.data.company);
        // this.router.navigateByUrl('/dashboard');
      }else{
        this.messages = 'Login ' + ' ' + this.respon.success + '! '+ this.respon.message;
        this.loginStatus=false;
        // this.toastr.error(this.messages, 'Invalid Password!');
        this.alertsDismiss.push({
          type: 'danger',
          msg: this.messages + ` ( trying login at: ${new Date().toLocaleTimeString()} )`,
          timeout: 3000
        });
        // console.log(this.alertsDismiss[0].msg);
      }
    });
  }
  
  onClosedSuccess(dismissedAlert: any, success): void {
    this.alertsDismiss = this.alertsDismiss.filter(alert => alert !== dismissedAlert);
    if(success==true){
      this.router.navigateByUrl('/dashboard');
      // window.location.reload();
    }
  }

}
