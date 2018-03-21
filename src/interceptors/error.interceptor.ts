import { StorangeService } from './../services/storange.service';

import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http"
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        public storage: StorangeService,
        public alertCtrl:AlertController
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("passou");
        return next.handle(req)
            .catch((error, cougth) => {
                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }

                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log('Erro detectado pelo interceptor => ');
                console.log(errorObj);

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                        default:
                        this.handleDefault(errorObj);
                        break
                }

                return Observable.throw(errorObj);
            }) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title:'Erro 401: Falha de autenticação.',
            message: 'Email ou senha incorretos.',
            enableBackdropDismiss:false,
            buttons:[
                {
                    text:'ok'
                }
            ]
        });
        alert.present();
    }

    handleDefault(error) {
        let alert = this.alertCtrl.create({
            title:`Erro ${error.status} : ${error.error}`,
            message: error.message,
            enableBackdropDismiss:false,
            buttons:[
                {
                    text:'ok'
                }
            ]
        });
        alert.present();
    }

}


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}
