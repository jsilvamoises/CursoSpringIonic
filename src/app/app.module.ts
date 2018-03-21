import { CartService } from './../services/domain/cart.service';
import { ProdutoService } from './../services/domain/produto.service';
import { CidadeService } from './../services/domain/cidade.service';
import { EstadoService } from './../services/domain/estado.service';
import { ClienteNewDTO } from './../models/cliente-new.dto';
import { AuthInterceptor, AuthInterceptorProvider } from './../interceptors/auth-interceptor';
import { StorangeService } from './../services/storange.service';
import { AuthService } from './../services/auth.service';
import { ErrorInterceptorProvider } from './../interceptors/error.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { ClienteService } from '../services/domain/cliente.service';

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,


  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorangeService,  
    ClienteService,
    EstadoService,
    CidadeService,
    ProdutoService,
    CartService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
