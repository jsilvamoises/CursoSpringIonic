import { LocalUser } from './../models/local_user';
import { Injectable } from '@angular/core';
import { STORANGE_KEYS } from '../config/storenge_keys.config';

@Injectable()
export class StorangeService{
     getLocalUser():LocalUser{
          let usr = localStorage.getItem(STORANGE_KEYS.localUser);
          if(usr == null){
              return null;
          }else{
              JSON.parse(usr);
          }
     }

     setLocalUser(user:LocalUser){
          if(user==null){
              localStorage.removeItem(STORANGE_KEYS.localUser);
          }else{
              localStorage.setItem(STORANGE_KEYS.localUser,JSON.stringify(user));
          }
     }
}