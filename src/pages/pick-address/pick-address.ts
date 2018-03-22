import { ItemPedidoDTO } from './../../models/item-pedido.dto';
import { PagamentoDTO } from './../../models/pagamento.dto';
import { CartItem } from './../../models/cart-item';
import { CartService } from './../../services/domain/cart.service';
import { PedidoDTO } from './../../models/pedido.dto';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorangeService } from '../../services/storange.service';
import { RefDTO } from '../../models/ref.dto';


@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  enderecos: EnderecoDTO[];
  cartItems:ItemPedidoDTO[];
  pedido:PedidoDTO;
  constructor(public navCtrl: NavController, 
    public clienteService:ClienteService,
    public storange:StorangeService,
    public cartService:CartService,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.buscarEnderecosPorEmail();
  }


  buscarEnderecosPorEmail(){
    let user = this.storange.getLocalUser();
    if(user && user.email){
      
      this.clienteService.findByEmail(user.email)
      .subscribe(response =>{
        this.enderecos = response['enderecos'];
        let cart = this.cartService.getCart();
        
        this.pedido={
           cliente:{id:response['id']},
           enderecoEntrega:{id:null},
           pagamento:null,
           items:cart.items.map(x =>{return{quantidade:x.quantidade,produto:{id:x.produto.id}}})

        }
        /*
        cart.items.forEach(i=>{
           this.pedido.items.push({quantidade:i.quantidade,produto:{id:i.produto.id}});
        });*/
    
        
        console.log(this.pedido);
        
      },error =>{});
     
    }
  }

  nextPage(endereco:EnderecoDTO){
        this.pedido.enderecoEntrega = {id:endereco.id};
        this.navCtrl.push('PaymentPage',{pedido:this.pedido});
        console.log(this.pedido);
  }

}
