import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoriaDTO } from '../../models/categoria.dto';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoriaService{
     constructor(public http: HttpClient){

     }


     findAll():Observable<CategoriaDTO[]>{
         return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
     }


     getImageFromBucket(id:string):Observable<any>{
        console.log('buscando image no bucket.')
        let url = `${API_CONFIG.backetBaseUrl}/cat${id}.jpg`
        return this.http.get(url,{responseType:'blob'});
    }
}