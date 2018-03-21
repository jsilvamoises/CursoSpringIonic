import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { EstadoDTO } from './../../models/estado.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class EstadoService{
    estados=[];
    estado:EstadoDTO ={
        id:'',
        nome:''
    }
     constructor(public http:HttpClient){

     }


     listEstados():Observable<EstadoDTO[]>{
         let url = `${API_CONFIG.baseUrl}/estados`;
         return this.http.get<EstadoDTO[]>(url);
     }

}