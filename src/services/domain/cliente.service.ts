import { API_CONFIG } from './../../config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteDTO } from '../../models/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { StorangeService } from '../storange.service';
@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storange: StorangeService) { }

    findByEmail(email: string): Observable<ClienteDTO> {
        console.log('Iniciando busca por email');
       /* let token = this.storange.getLocalUser().token;
        let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });*/
        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id:string):Observable<any>{
        console.log('buscando image no bucket.')
        let url = `${API_CONFIG.backetBaseUrl}/cp${id}.jpg`
        return this.http.get(url,{responseType:'blob'});
    }
}