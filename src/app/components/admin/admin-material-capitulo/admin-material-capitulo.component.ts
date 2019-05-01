import { Component, OnInit, Input, HostListener,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService }  from "../../../services/user.service";
import { VideosService }  from "../../../services/videos.service";
import { NavComponent } from "../../nav-p/nav-p.component";
import { User } from "../../../models/user";
import { Unidad } from "../../../models/unidad";
import { Capitulo } from "../../../models/capitulos";
import { GLOBAL } from '../../../services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import swal from'sweetalert2';

import { FormBuilder, FormGroup, Validators, FormControl, Form } from "@angular/forms";
import { MaterialService } from '../../../services/material.service';

@Component({
  selector: 'app-admin-material-capitulo',
  templateUrl: './admin-material-capitulo.component.html',
  styleUrls: ['./admin-material-capitulo.component.css']
})
export class AdminMaterialCapituloComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  public identity;
  public title;
  public token;
  public capitulo: Capitulo;
  public fileToUpload;
  public formData:any;
  public url;
  public loaderUnidad: boolean = true;

  public unidades;
  public objUnidades;

  public capitulos;
  public objCapitulos;

  public data:any = { status:{} };

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _videosService: VideosService,
    private _http: HttpClient,
    private _materialService: MaterialService
  ) { 
    this.url = GLOBAL.url;
    this.title = 'Administrador Capitulos (material)';
    this.capitulo = new Capitulo(1,'','','','','0');
  }

  ngOnInit() {
    this.redirectIfIdentity();
    //this.getCapitulos();
    this.getUnidades();
  }

  redirectIfIdentity(){
    this.identity = this._userService.getIdentity();
   
    if( this.identity == null ) {
      this._router.navigate([ "/login" ]);
    }else if( this.identity.role == 'user' ){
        this._router.navigate([ "/home" ]);
    }

  }

  getUnidades(){
    this.token = this._userService.getToken();
    let formData = new FormData();
    formData.append('authorization', this.token);
       
    if( this.token != null && this.token != ''){       
        this._materialService.ObtUnidad( formData )
            .subscribe(respRegiones => {
                this.objUnidades  = respRegiones;
                this.unidades     = this.objUnidades.data;

                this.loaderUnidad = false;
        
                /*if(this.objUnidades.status != 'success'){
                    this._router.navigate([ "/home" ]);
                }*/

            });
    }
  }

  fileChange(event) {
      console.log( event );

      this.fileToUpload = event.target.files[0];
  }

  
  onSubmit(){

    this.token = this._userService.getToken();
    let formData = new FormData();
    formData.append('nombre', this.capitulo.nombre);
    formData.append('descripcion', this.capitulo.descripcion);
    formData.append('unidad', this.capitulo.unidad);
    formData.append('authorization', this.token);
    formData.append('suscripcion', this.capitulo.suscripcion);

    this._materialService.IngCapitulo( formData )
        .subscribe(data => {

            this.data = data;

            if( this.data.status == 'success' ){
                swal({
                    title: 'Capitulo creado exitosamente',
                    text: 'Nuevo capitulo creado exitosamente.',
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'ok!'
                }).then((result) => {
                    if (result.value) {

                    //window.location.href = '/admin';

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


    }, error => {
          console.log(error);
    });
}


}
