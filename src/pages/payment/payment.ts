import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  pedido:PedidoDTO;
  parcelas:number[]=[1,2,3,4,5,6,7,8,9,10];
  formGroup:FormGroup;

  constructor(public navCtrl: NavController, 
    public formBuild:FormBuilder,
    public navParams: NavParams) {

      this.pedido = this.navParams.get('pedido');
      console.log("Pedido: "+this.pedido);
      this.formGroup = this.formBuild.group({
        numeroParcelas:[1,Validators.required],
        '@type':['PagamentoComCartao',Validators.required]
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  nextPage(){
    this.pedido.pagamento = this.formGroup.value;
    console.log(this.pedido.pagamento);
    this.navCtrl.setRoot('OrderConfirmationPage',{pedido:this.pedido});
  }

}
