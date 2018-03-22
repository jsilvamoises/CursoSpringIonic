import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoDTO } from './../../models/produto.dto';
import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  items:CartItem[];
  constructor(
    public cartService:CartService,
    public produtoService:ProdutoService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.getImageIfExist();
  }


  getImageIfExist(){
    this.items.forEach(item => {
      this.loadImage(item.produto);
    });
  }

  loadImage(produto:ProdutoDTO){
       this.produtoService.getImageFromBucket(produto.id)
       .subscribe(response =>{
         produto.imageUrl = `${API_CONFIG.backetBaseUrl}/prod${produto.id}-small.jpg`;
       },errors =>{});
  }


  removerItem(produto:ProdutoDTO){
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto:ProdutoDTO){
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto:ProdutoDTO){
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total():number{
    return this.cartService.total();
  }

  goOn(){
    this.navCtrl.setRoot('CategoriasPage');
  }
  checkout(){
    this.navCtrl.push('PickAddressPage');
  }

  disableBotaoFinalizarCompra(){
        return this.cartService.getCart().items.length < 1;
  }
}
