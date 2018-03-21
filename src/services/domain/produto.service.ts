import { ProdutoDTO } from './../../models/produto.dto';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class ProdutoService {
      constructor(public http: HttpClient) { }


      findByCategoria(categoria_id: string) {
            return this.http.get(`${API_CONFIG.baseUrl}/produtos/categorias/${categoria_id}/?sort=nome,asc`);
      }

      getImageFromBucket(id: string): Observable<any> {
            console.log('buscando image no bucket.')
            let url = `${API_CONFIG.backetBaseUrl}/prod${id}-small.jpg`
            return this.http.get(url, { responseType: 'blob' });
      }

      getBigImageFromBucket(id: string): Observable<any> {
            console.log('buscando image no bucket.')
            let url = `${API_CONFIG.backetBaseUrl}/prod${id}.jpg`
            return this.http.get(url, { responseType: 'blob' });
      }

      findById(produto_id:string){
            let url = `${API_CONFIG.baseUrl}/produtos/${produto_id}`;
            return this.http.get<ProdutoDTO>(url);
      }
}