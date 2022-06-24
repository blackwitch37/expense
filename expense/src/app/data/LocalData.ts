
import * as CryptoJS from 'crypto-js';
export class LocalData {

    public static setToken(token) {
        localStorage.setItem("token", token);
    }
    public static getToken() {
        return localStorage.getItem("token");
    }    
    public static unsetToken(){
        localStorage.setItem("token",'');
    }

    public static getAppId() {
        if (localStorage.getItem("appid") == null || localStorage.getItem("appid") == "null" || localStorage.getItem("appid") == "") {
            var text = "WEB";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 37; i++){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            localStorage.setItem("appid", text);
        }
        return localStorage.getItem("appid");
    }

    public static setAuthenticate(authenticate){
        localStorage.setItem("login",authenticate);
    }
    // public static getAuthenticate(){
    //     return localStorage.getItem("login",);
    // }

    public static setRole(role){
        localStorage.setItem("role",CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(role)));
    }
    public static unsetRole(){
        localStorage.setItem("role",'');
    }
    public static getRole(){
        return localStorage.getItem("role");
    }

    public static getMenu(){
        return localStorage.getItem("menu");
    }
    public static unsetMenu(){
        localStorage.setItem("menu", '');
    }
    public static setMenu(role){
        if(role==null){
            role = 'else';
        }
        var arr = [];
        var roles = CryptoJS.enc.Base64.parse(role);
        roles = CryptoJS.enc.Utf8.stringify(roles).toString();
        if(roles=='administrator' || roles=='manager'){
            arr = [
                {
                    name: 'Dashboard',
                    url: '/dashboard',
                    icon: 'icon-speedometer',
                    badge: {
                    variant: 'info',
                    text: '✓'
                    }
                },
                {
                    name: 'Master',
                    url: '/master',
                    icon: 'icon-layers',
                    children: [
                    {
                        name: 'Account',
                        url: '/master/account',
                        icon: 'icon-list'
                    },
                    {
                        name: 'Location',
                        url: '/master/location',
                        icon: 'icon-location-pin'
                    },
                    {
                        name: 'User',
                        url: '/master/user',
                        icon: 'icon-user'
                    },
                    {
                        name: 'User Level',
                        url: '/master/userlevel',
                        icon: 'icon-people'
                    }
                    ]
                },
                {
                    name: 'Transaction',
                    url: '/transaction',
                    icon: 'icon-book-open',
                    children: [
                    {
                        name: 'Expense',
                        url: '/transaction/expense',
                        icon: 'icon-wallet'
                    }
                    ]
                },
                {
                    name: 'Report',
                    url: '/report',
                    icon: 'icon-docs',
                    children: [
                    {
                        name: 'Report Expense',
                        url: '/report/expense',
                        icon: 'icon-wallet'
                    }
                    ]
                },
                {
                    name: 'Import',
                    url: '/import',
                    icon: 'icon-cloud-upload',
                    children: [
                    {
                        name: 'Import Data',
                        url: '/import/importdata',
                        icon: 'icon-docs'
                    },
                    {
                        name: 'Import Account',
                        url: '/import/importaccount',
                        icon: 'icon-list'
                    }
                    ]
                }
            ];
        }else{
            arr = [
                {
                    name: 'Dashboard',
                    url: '/dashboard',
                    icon: 'icon-speedometer',
                    badge: {
                    variant: 'info',
                    text: 'NEW'
                    }
                },
                {
                    name: 'Master',
                    url: '/master',
                    icon: 'icon-layers',
                    children: [
                    {
                        name: 'Account',
                        url: '/master/account',
                        icon: 'icon-list'
                    }
                    ]
                },
                {
                    name: 'Transaction',
                    url: '/transaction',
                    icon: 'icon-book-open',
                    children: [
                    {
                        name: 'Expense',
                        url: '/transaction/expense',
                        icon: 'icon-wallet'
                    }
                    ]
                },
                {
                    name: 'Report',
                    url: '/report',
                    icon: 'icon-docs',
                    children: [
                    {
                        name: 'Report Expense',
                        url: '/report/expense',
                        icon: 'icon-wallet'
                    }
                    ]
                }
            ];
        }
        localStorage.setItem("menu", role);
        return arr;
    }

    public static setUser(user){
        localStorage.setItem("userId",user);
    }
    public static unsetUser(){
        localStorage.setItem("userId",'');
    }
    public static getUser(){
        return localStorage.getItem("userId");
    }

    public static setName(name){
        localStorage.setItem("name",name);
    }
    public static unsetName(){
        localStorage.setItem("name",'');
    }
    public static getName(){
        return localStorage.getItem("name");
    }

    public static setCompany(company){
        localStorage.setItem("company",company);
    }
    public static unsetCompany(){
        localStorage.setItem("company",'');
    }
    public static getCompany(){
        return localStorage.getItem("company");
    }

    public static setDetail(id,type){
        localStorage.setItem("id",id);
        localStorage.setItem("type",type);
    }
    public static unsetDetail(){
        localStorage.setItem("id",'');
        localStorage.setItem("type",'');
    }
    public static getDetail(){
        return localStorage.getItem("id");
        // return localStorage.getItem("type");
    }
    
    public static setLocation(location){
        localStorage.setItem("loc",location);
    }
    public static unsetLocation(){
        localStorage.setItem("loc",'');
    }
    public static getLocation(){
        return localStorage.getItem("loc");
    }
    // public static setUserId(id,type){
    //     localStorage.setItem("userId",id);
    //     localStorage.setItem("type",type);
    // }
    // public static unsetUserId(){
    //     localStorage.setItem("userId",'');
    //     localStorage.setItem("type",'');
    // }
    // public static getUserId(){
    //     localStorage.getItem("userId");
    //     localStorage.getItem("type");
    // }

    public static isAuthenticate():boolean{
        if(localStorage.getItem("login")==null || localStorage.getItem("login")=="null" ||localStorage.getItem("login")==""){
            return false;
        }
        if(localStorage.getItem("token")== "null" || localStorage.getItem("token")== ""){
            return false;
        }
        return localStorage.getItem("login")=="true" ? true:false;
    }

}
