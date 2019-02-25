import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import swal from'sweetalert2';

@Injectable()
export class GlobalService{
    public url: string;
    public identity;
    public token;
    public title;
    public text;
    public type;

    constructor( 
        private _http: HttpClient
    ){
       this.url = GLOBAL.url;
    }

    alertSweet( code ){

        switch(code) {
            case 401:
                //error de login, vacio
                this.title = 'A ocurrido un error.';
                this.text = 'Debes ingresar todos los datos para acceder al sistema.';
                this.type = 'error';
                break;
            case 402:
                //error login, datos incorrectos
                this.title = 'A ocurrido un error.';
                this.text = 'Debes ingresar los datos correctamente para acceder al sistema.';
                this.type = 'error';
                break;
            case 501:
                //error login, datos incorrectos
                this.title = 'A ocurrido un error.';
                this.text = 'A ocurrido un error con el servidor, por favor intentelo mas tarde.';
                this.type = 'error';
                break;
            default:
              // code block
        }

        swal({
            title               : this.title,
            text                : this.text,
            type                : this.type,
            confirmButtonColor  : '#3085d6',
            confirmButtonText   : 'ok!'
        }).then((result) => {
            if (result.value) {

            }
        })

    }

}


export var GLOBAL = {
    url: 'http://localhost:8000'
};