import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy, DatePipe, DecimalPipe, TitleCasePipe, LowerCasePipe, UpperCasePipe, registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
registerLocaleData(localeId, 'id');
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';

import { DataTablesModule } from "angular-datatables";
import { ModalModule } from 'ngx-bootstrap/modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDateRangeModule } from 'ngx-daterange';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
// import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';
import { ImportdataComponent } from './import/importdata/importdata.component';
import { ImportdataService } from './import/importdata/importdata.service';
import { ImportaccountComponent } from './import/importaccount/importaccount.component';
import { ImportaccountService } from './import/importaccount/importaccount.service';
import { DefaultLayoutService } from './containers/default-layout/default-layout.service';
import { AccountComponent } from './master/account/account.component';
import { AccountService } from './master/account/account.service';
import { ExpenseComponent } from './trx/expense/expense.component';
import { ExpenseService } from './trx/expense/expense.service';
import { UserComponent } from './master/user/user.component';
import { UserService } from './master/user/user.service';
import { LocationComponent } from './master/location/location.component';
import { LocationService } from './master/location/location.service';
import { UserlevelComponent } from './master/userlevel/userlevel.component';
import { UserlevelService } from './master/userlevel/userlevel.service';
import { ReportexpenseComponent } from './report/reportexpense/reportexpense.component';
import { ReportexpenseService } from './report/reportexpense/reportexpense.service';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgSelectModule,
    NgxDateRangeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    AlertModule.forRoot(),
    DataTablesModule,
    ModalModule.forRoot(),
    
  ],
  exports: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ImportdataComponent,
    ImportaccountComponent,
    AccountComponent,
    ExpenseComponent,
    UserComponent,
    LocationComponent,
    UserlevelComponent,
    ReportexpenseComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    DatePipe,DecimalPipe,
    {provide: LOCALE_ID, useValue: 'id-ID'},
    DefaultLayoutService,
    IconSetService,
    LoginService,

    //dashboard
    DashboardService,

    //import
    ImportaccountService,
    ImportdataService,

    //master
    AccountService,
    UserService,
    UserlevelService,
    LocationService,
    
    //transaction
    ExpenseService,

    //report
    ReportexpenseService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
