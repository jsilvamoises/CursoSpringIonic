import { EnderecoDTO } from './../../models/endereco.dto';
import { ClienteDTO } from './../../models/cliente.dto';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';
import { ClienteService } from './../../services/domain/cliente.service';
import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {
  pedido:PedidoDTO;
  cartItems:CartItem[];
  cliente:ClienteDTO;
  endereco:EnderecoDTO;
  codigoPedido:string;
  constructor(
    public navCtrl: NavController, 
    public clienteService:ClienteService,
    public cartService:CartService,
    public pedidoService:PedidoService,
    public navParams: NavParams) {
      this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id)
    .subscribe(response =>{
      this.cliente = response as ClienteDTO;
      this.endereco = this.loadEndereco(response['enderecos']);
    },error=>{
      this.navCtrl.setRoot('HomePage');
    });
  }

  loadEndereco(list:EnderecoDTO[]):EnderecoDTO{
    let end:EnderecoDTO;
    list.forEach(e =>{
       if(this.pedido.enderecoEntrega.id == e.id){
         end = e;
       }
    });

    return end;
  }


  total(){
    return this.cartService.total();
  }

  checkout(){
      this.pedidoService.salvarPedido(this.pedido)
      .subscribe(response =>{
        this.cartService.createOrClearCart();
        this.codigoPedido = this.extractId(response.headers.get('location'));
      },error =>{
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  back(){
    this.navCtrl.setRoot('CartPage');
  }

  home(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  private extractId(location:string):string{
    let position = location.lastIndexOf('/');
    return location.substring(position+1,location.length);
  }

}
