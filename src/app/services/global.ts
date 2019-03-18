import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import swal from'sweetalert2';
import { Router, ActivatedRoute, Params } from "@angular/router";


@Injectable()
export class GlobalService{
    public url: string;
    public identity;
    public token;
    public title;
    public text;
    public type;
    public confirmButtonText;

    constructor( 
        private _http: HttpClient,
        private _route: ActivatedRoute,
        private _router: Router
    ){
       this.url = GLOBAL.url;
    }

    alertSweet( code ){

        switch( code ) {
            case 401:
                //error de login, vacio
                this.title              = 'Ha ocurrido un error.';
                this.text               = 'Debes ingresar los datos correctamente para acceder al sistema.';
                this.type               = 'error';
                this.confirmButtonText  = 'Aceptar';
                break;
            case 402:
                //error login, datos incorrectos
                this.title              = 'Ha ocurrido un error.';
                this.text               = 'El RUT ingresado ya se encuentra registrado anteriormente.';
                this.type               = 'error';
                this.confirmButtonText  = 'Aceptar';
                break;
            case 501:
                //error login, datos incorrectos
                this.title              = 'Ha ocurrido un error.';
                this.text               = 'A ocurrido un error con el servidor, por favor intentelo mas tarde.';
                this.type               = 'error';
                this.confirmButtonText  = 'Aceptar';
                break;
            case 201:
                //error login, datos incorrectos
                this.title              = 'Bienvenido.';
                this.text               = 'Te has identificado correctamente.';
                this.type               = 'success';
                this.confirmButtonText  = 'Aceptar';
                break;
            case 202:
                //registro exitoso
                this.title              = 'Gracias.';
                this.text               = 'Ya puedes acceder a nuestras clases.';
                this.type               = 'success';
                this.confirmButtonText  = 'Aceptar';
                break;        
            default:
              // code block
        }

        swal({
            title               : this.title,
            text                : this.text,
            type                : this.type,
            allowOutsideClick   : false,
            confirmButtonColor  : '#3085d6',
            confirmButtonText   : this.confirmButtonText
        }).then((result) => {
            if (result.value) {
                
                if(code == 201){
                    this._router.navigate([ "/home" ]);
                }

                if(code == 202){
                    this._router.navigate([ "/login" ]);
                }
                
            }
        })

    }

}


export var GLOBAL = {
    url: 'http://api.premate.cl'
};