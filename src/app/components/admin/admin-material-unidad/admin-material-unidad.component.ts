import { Component, OnInit, Input, HostListener,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService }  from "../../../services/user.service";
import { MaterialService }  from "../../../services/material.service";
import { NavComponent } from "../../nav-p/nav-p.component";
import { GLOBAL } from '../../../services/global';
import { Unidad } from "../../../models/unidad";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import swal from'sweetalert2';

import { FormBuilder, FormGroup, Validators, FormControl, Form } from "@angular/forms";

@Component({
  selector: 'app-admin-material-unidad',
  templateUrl: './admin-material-unidad.component.html',
  styleUrls: ['./admin-material-unidad.component.css']
})
export class AdminMaterialUnidadComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  public identity;
  public title;
  public url;
  public unidad;
  public token;
  public fileToUpload;
  public data;

  constructor(
      private _userService: UserService,
      private _materialService:MaterialService,
      private _router: Router,
      private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
    this.title = 'Administrador Unidades (material)';
    this.unidad = new Unidad(1,'','','','0');
   }

  ngOnInit() {
    this.redirectIfIdentity();
  }

  redirectIfIdentity(){
    this.identity = this._userService.getIdentity();
   
    if( this.identity == null ) {
      this._router.navigate([ "/login" ]);
    }else if( this.identity.role == 'user' ){
        this._router.navigate([ "/home" ]);
    }
  }

  fileChange(event) {
    this.fileToUpload = event.target.files[0];
  }

onSubmit(){
    this.token = this._userService.getToken();
    //let url2 = this.url + '/ing/unidades';      
    let formData = new FormData();

    formData.append('imagen', this.fileToUpload);
    formData.append('nombre', this.unidad.nombre);
    formData.append('descripcion', this.unidad.descripcion);
    formData.append('authorization', this.token);
    formData.append('suscripcion', this.unidad.suscripcion);
      

    this._materialService.IngUnidad(formData)
        .subscribe(data => {

            this.data = data;

            console.log( this.data );

            if( this.data.status == 'success' ){
                swal({
                    title: 'Unidad creada exitosamente',
                    text: 'Nueva unidad creada exitosamente.',
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'ok!'
                }).then((result) => {
                    if (result.value) {

                    window.location.href = '/admin';

                    }
                })
            }else{

                swal({
                    title: 'A ocurrido un problema',
                    text: this.data.msg,
                    type: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'ok!'
                }).then((result) => {
                    if (result.value) {

                    //window.location.href = '/admin';

                    }
                })


            }


        // do something, if upload success
      }, error => {
          console.log(error);
      });
    }


}
