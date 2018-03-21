import { CidadeDTO } from './../../models/cidade.dto';
import { CidadeService } from './../../services/domain/cidade.service';
import { EstadoService } from './../../services/domain/estado.service';
import { Observable } from 'rxjs/Rx';
import { EstadoDTO } from './../../models/estado.dto';
import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { ClienteNewDTO } from './../../models/cliente-new.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  formGroup: FormGroup;  
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public clienteService: ClienteService,
    public estadoService: EstadoService,
    public cidadeService:CidadeService,
    public formBuilder: FormBuilder) {
      this.formGroup =formBuilder.group({
        nome:['Moiseés Juvenal',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
        email:['',[Validators.required,Validators.email]],
        tipo:['',[Validators.required]],
        cpfCnpj:['',[Validators.required,Validators.minLength(11),Validators.minLength(14)]],
        senha:['',[Validators.required]],
        logradouro:['',[Validators.required]],
        numero:['',[Validators.required]],
        complemento:['',[]],
        bairro:['',[Validators.required]],
        cep:['',[Validators.required]],
        telefone01:['',[Validators.required]],
        telefone02:['',[]],
        telefone03:['',[]],
        password:['',[Validators.required]],
        estadoId:['',[Validators.required]],
        cidadeId:['',[Validators.required]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.listarEstados();
  }


  cadastrar() {
    
  }

  listarEstados() {
    this.estadoService.listEstados()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      }, error => { });
  }


  updateCidades(){
    let estadoId = this.formGroup.value.estadoId;
     this.cidadeService.cidadesByEstadoID(estadoId)
     .subscribe(response =>{
       this.cidades = response;
       this.formGroup.controls.cidadeId.setValue(null);
     },error =>{})
  }

}
