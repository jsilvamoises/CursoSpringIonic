import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  credenciais: CredenciaisDTO = { username: "", password: "" };
  constructor(public navCtrl: NavController,
    public loadContrl: LoadingController,
    public menu: MenuController, public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidEnter() {

    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successFullLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      }, error => { });
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  login() {
    let loader = this.presentLoading();
    console.log(this.credenciais);
    this.auth.autheticate(this.credenciais)
      .subscribe(response => {
        loader.dismiss();
        this.auth.successFullLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      }, error => { 
        loader.dismiss();
      });

  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  presentLoading() {
    let loader = this.loadContrl.create({
      content: "Aguarde....."

    });
    loader.present();
    return loader;
  }

}
