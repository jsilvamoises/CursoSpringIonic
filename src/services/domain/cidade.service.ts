import { CidadeDTO } from './../../models/cidade.dto';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class CidadeService{
     constructor(public http:HttpClient){

     }

     cidadesByEstadoID(id:string):Observable<CidadeDTO[]>{
         let url = `${API_CONFIG.baseUrl}/estados/${id}/cidades`;
         return this.http.get<CidadeDTO[]>(url);
     }
}