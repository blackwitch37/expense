import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalData } from "./LocalData";

export class HeaderData {

    public static getTokenHeader(){
        return new HttpHeaders({"token":LocalData.getToken()});
    }

    public static getAppId(){
        return new HttpHeaders({"appid":LocalData.getAppId()});
    }

}
