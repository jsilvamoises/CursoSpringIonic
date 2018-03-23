import { Camera, CameraOptions } from '@ionic-native/camera';
import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { StorangeService } from './../../services/storange.service';
import { LocalUser } from './../../models/local_user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  cliente: ClienteDTO;
  picture:string;
  cameraOn:boolean =false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorangeService,
    private camera:Camera,
    public loadContrl: LoadingController,
    public clienteService: ClienteService) {
  }



  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();

        }, error => {
          if (error.status == 403) {
            this.gotoHomePage();
          }
        });
    } else {
      this.gotoHomePage();
    }
  }

  gotoHomePage() {
    this.navCtrl.setRoot('HomePage');
  }
  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.backetBaseUrl}/cp${this.cliente.id}.jpg`;
        console.log('Imagem do bucket ok ' + this.cliente.imageUrl)
      }, error => { });

  }

  getCameraPicture(){
    this.cameraOn=true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn=false;
    }, (err) => {
     // Handle error
    });
  }

  getGalleryPicture(){
    this.cameraOn=true;
    const options: CameraOptions = {
      quality: 100,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn=false;
    }, (err) => {
     // Handle error
    });
  }


  sendPicture(){
    let loader = this.presentLoading();
    this.clienteService.uploadPicture(this.picture)
    .subscribe(response =>{
      loader.dismiss();
      this.picture = null;
      this.loadData();
    },errors=>{
      loader.dismiss();
    });
  }

  cancel(){
    this.picture = null;
  }


  presentLoading() {
    let loader = this.loadContrl.create({
      content: "Aguarde. Fazendo upload..."

    });
    loader.present();
    return loader;
  }
  
}
