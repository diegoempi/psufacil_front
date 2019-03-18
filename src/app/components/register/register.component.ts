import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { LocalizacionService } from "../../services/localizacion.service";
import { User } from "../../models/user";
import swal from'sweetalert2';
import * as rutHelpers from 'rut-helpers';
import { GlobalService } from "../../services/global";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UserService ]
})
export class RegisterComponent implements OnInit {
  
  public identity;
  public title: string;
  public user: User;
  public status;
  public objRegiones = <any>{ data: {} };
  public regiones = <any>[];
  public objComunas = <any>{ data: {} };
  public comunas = <any>[];
  public objColegios = <any>{ data: {} };
  public colegios = <any>[];
  public disableComuna = true;
  public disableColegio = true;
  public validaRut;
  public code;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private localizacion: LocalizacionService,
    private _globalService: GlobalService
  ) {

    this.title = 'Registrate';
    this.user = new User(1,"","","","","","","","","","","","","","","","","","user");
    

    this.localizacion.getRegion()
    .subscribe(respRegiones => {
      this.objRegiones  = respRegiones;
      this.regiones     = this.objRegiones.data;
    });

   }

  ngOnInit() {
    this.redirectIfIdentity();
  }

  redirectIfIdentity(){
    let identity = this._userService.getIdentity();
    
    if( identity != null  && identity.sub) {
      this._router.navigate([ "/home" ]);
    }

  }

  onSubmit(){

    this._userService.register( this.user )
        .subscribe(
            response => {
                this.status = response;

                if( this.status.status == 'error' ){
                  this.code = 402;
                  this._globalService.alertSweet( this.code );
                }else{
                  /*swal({
                    type: 'success',
                    title: 'Gracias',
                    text: 'Ya puedes acceder a nuestras clases.'
                  });*/
                  swal({
                    title: 'Gracias',
                    text: 'Ya puedes acceder a nuestras clases.',
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Acceder!'
                  }).then((result) => {
                    if (result.value) {

                      window.location.href = '/login';

                    }
                  })

                  this.user = new User(1,"","","","","","","","","","","","","","user","","","","");


                }
            },
            error => {
              this.code = 501;
              this._globalService.alertSweet( this.code );
            }
        )
  }

  validateRut (): { [ s:string ]:boolean }{
    this.validaRut = rutHelpers.rutValidate( this.user.rut );
    return this.validaRut;
  }
  

  getComunas(){

    this.user.comuna = "";
    this.user.colegio = "";
    this.colegios = [];
    this.comunas = [];

    if(this.user.region != ''){
      this.localizacion.getComuna( this.user.region )
      .subscribe( respComunas => {
        this.objComunas  = respComunas;

        for(let key in this.objComunas.data){
          if(this.objComunas.data.hasOwnProperty(key)){
            this.comunas.push(this.objComunas.data[key]);
          }
        }
          this.disableComuna = false;
          this.disableColegio = true;
      });
    }
  }

  getColegios(){
    this.user.colegio = "";
    this.colegios = [];

    if(this.user.comuna != ''){

      this.localizacion.getColegio( this.user.comuna )
      .subscribe( respColegios => {

        this.colegios = [];
        this.objColegios = respColegios;
        
        for(let key in this.objColegios.data){
          if(this.objColegios.data.hasOwnProperty(key)){
            this.colegios.push(this.objColegios.data[key]);
          }
        }

        this.disableColegio = false;

      });
    }
  }

}
