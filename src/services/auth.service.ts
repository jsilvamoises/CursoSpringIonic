import { CartService } from './domain/cart.service';
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
    constructor(public http: HttpClient, 
        public storange:StorangeService,
    public cartService:CartService ) {

    }
    autheticate(creds: CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds,
            { observe: 'response', responseType: 'text' })
    }


    successFullLogin(authorizationValue : string) {
       let tok = authorizationValue.substring(7);

       let localUser : LocalUser = {
           token:tok,
           email: this.jwtHelper.decodeToken(tok).sub
       };

       this.storange.setLocalUser(localUser);
       this.cartService.createOrClearCart();
    }

    refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,{},
            { observe: 'response', responseType: 'text' })
    }

    logout(){
        this.storange.setLocalUser(null);
    }
}