import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProdutoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {
  produto: ProdutoDTO;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public produtoService:ProdutoService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.produtoService.findById(produto_id)
    .subscribe(response =>{
      this.produto = response;
      this.loadImage();

    },errors =>{});
    

  }

  loadImage(){
    this.produtoService.getBigImageFromBucket(this.produto.id)
    .subscribe(response =>{
      this.produto.imageUrl = `${API_CONFIG.backetBaseUrl}/prod${this.produto.id}.jpg`;
    },error =>{});
  }

}
