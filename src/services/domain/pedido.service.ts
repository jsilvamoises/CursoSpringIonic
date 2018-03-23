import { API_CONFIG } from './../../config/api.config';
import { PedidoDTO } from './../../models/pedido.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PedidoService {
    constructor(public http: HttpClient) {

    }

    salvarPedido(pedido: PedidoDTO) {
        let url = `${API_CONFIG.baseUrl}/pedidos`;
      return  this.http.post(url, pedido,
            {
                observe: 'response',
                responseType: 'text'

            }
        );
    }

}