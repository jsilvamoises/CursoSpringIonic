import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from '@angular/core';
import { StorangeService } from './storange.service';
import { JwtHelper } from 'angular2-jwt'
@Injectable()
export class AuthService {
    jwtHelper : JwtHelper = new JwtHelper();
    constructor(public http: HttpClient, public storange:StorangeService ) {

    }
    autheticate(creds: CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds,
            { observe: 'response', responseType: 'text' })
    }


    successFullLogin(authorizationValue: string) {
       let token = authorizationValue.substring(7);

       let localUser : LocalUser = {
           token:token,
           email: this.jwtHelper.decodeToken(token).sub
       }

       this.storange.setLocalUser(localUser);
    }

    logout(){
        this.storange.setLocalUser(null);
    }
}