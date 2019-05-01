import { Component, OnInit, Input, HostListener,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService }  from "../../../services/user.service";
import { VideosService }  from "../../../services/videos.service";
import { NavComponent } from "../../nav-p/nav-p.component";
import { User } from "../../../models/user";
import { Unidad } from "../../../models/unidad";
import { Capitulo } from "../../../models/capitulos";
import { Material } from "../../../models/material";
import { GLOBAL } from '../../../services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import swal from'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from "@angular/forms";
import { MaterialService } from '../../../services/material.service';

@Component({
  selector: 'app-admin-material',
  templateUrl: './admin-material.component.html',
  styleUrls: ['./admin-material.component.css']
})
export class AdminMaterialComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  public identity;
  public title;
  public token;
  public capitulo: Capitulo;
  public formData:any;
  public url;
  public loaderUnidad: boolean = true;
  public material;
  public fileToUpload;
  public unidades;
  public objUnidades;
  public capitulos;
  public objCapitulos;
  public data:any = { status:{} };
  public disableCap = true;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _videosService: VideosService,
    private _http: HttpClient,
    private _materialService: MaterialService
  ) { 
    this.url = GLOBAL.url;
    this.title = 'Administrador Material (material)';
    this.material = new Material(1,'','','','','','0');
  }

  ngOnInit() {
    this.redirectIfIdentity();
    this.getCapitulos();
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

  getCapitulos(){
      this.token = this._userService.getToken();
      if( this.token != null && this.token != ''){
        
          this._videosService.obtAdmCapitulos( this.token )
              .subscribe(respRegiones => {
                  this.objCapitulos  = respRegiones;
                  this.capitulos     = this.objCapitulos.data;
        
                  /*if(this.objUnidades.status != 'success'){
                      this._router.navigate([ "/home" ]);
                  }*/
              });
      }
  }

  
  getCapChange( e ){
    this.token = this._userService.getToken();

    this._materialService.ObtCapitulosForm( e, this.token )
        .subscribe(data => {
            this.objCapitulos = data;
            this.capitulos = this.objCapitulos.data;      
            this.disableCap = false;
        }, error => {
            console.log(error);
        });
    }


  fileChange(event) {
    console.log( event );
    this.fileToUpload = event.target.files[0];
  }



  onSubmit(){

    this.token = this._userService.getToken();
    let formData = new FormData();
    formData.append('pdf', this.fileToUpload);
    formData.append('nombre', this.material.nombre);
    formData.append('descripcion', this.material.descripcion);
    //formData.append('pdf', this.material.url);
    formData.append('unidad', this.material.unidad);
    formData.append('capitulo', this.material.capitulo);
    formData.append('authorization', this.token);
    formData.append('suscripcion', this.material.suscripcion);

    this._materialService.IngMaterial(formData)
        .subscribe(data => {

            this.data = data;

            if( this.data.status == 'success' ){
                swal({
                    title: 'Material publicado exitosamente',
                    text: 'Nuevo material creado exitosamente.',
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
