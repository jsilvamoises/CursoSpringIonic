import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categoria.dto';
import { Observable } from 'rxjs/Rx';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  produtos: ProdutoDTO[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService:ProdutoService
  ) {
  }

  ionViewDidLoad() {
    this.listarProdutos();
  };

  listarProdutos(){
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response =>{
      this.produtos = response['content'];
      this.produtos.forEach(element => {
        this.getImageIfExists(element);
      });
    },errors =>{});
  }


  private loadImage() {
    this.produtos.forEach(element => {
      this.getImageIfExists(element);
    });
  }

  getImageIfExists(item : ProdutoDTO){
    this.produtoService.getImageFromBucket(item.id)
    .subscribe(response =>{
     item.imageUrl = `${API_CONFIG.backetBaseUrl}/prod${item.id}-small.jpg`;
      console.log('Imagem do bucket ok '+item.imageUrl)
    },error => {});

  }

  showDetail(produto_id:string){
    this.navCtrl.push('ProdutoDetailPage',{produto_id:produto_id});
  }

}
