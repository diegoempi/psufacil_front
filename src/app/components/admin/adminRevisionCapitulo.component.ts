import { Component, OnInit, Input, HostListener,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { RevisionService }  from "../../services/revision.service";
import { NavComponent } from "../nav-p/nav-p.component";
import { User } from "../../models/user";
import { AdminUnidadComponent } from "../admin/adminUnidad.component"
import { VideosService }  from "../../services/videos.service";
import { Video } from "../../models/videos";
import { Unidad } from "../../models/unidad";
import { RevisionUnidadLista } from "../../models/revisionUnidad";
import { GLOBAL } from '../../services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import swal from'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from "@angular/forms";


@Component({
  selector: 'app-admin-revision-capitulo',
  templateUrl: './adminRevisionCapitulo.component.html',
  styleUrls: [],
  providers: [UserService]
})
export class AdminRevisionCapituloComponent implements OnInit {
    @ViewChild('fileInput') fileInput;   
    public identity;
    public title;
    public token;
    public unidad: Unidad;
    public video: Video;
    public fileToUploadImg;
    public fileToUploadMat;
    public formData:any;
    public url;

    public disableCap = true;
    public loaderUnidad = true;

    public revisionUnidadLista;
    public objUnidades;
    public unidades;

    public data:any = { status:{} };

    constructor( 
        private _userService        : UserService,
        private _router             : Router,
        private _videosService      : VideosService,
        private _http               : HttpClient,
        private _revisionService    : RevisionService
    ){
            this.url = GLOBAL.url;
            this.title = 'Administrador Revisión Lista';
            this.unidad = new Unidad(1,'','','','');
            this.revisionUnidadLista = new RevisionUnidadLista(1,'','','0');
    }

    ngOnInit() {
        this.redirectIfIdentity();
        
        //traer unidades 
        this.getUnidadesRevision();
    }

    redirectIfIdentity(){
        this.identity = this._userService.getIdentity();
       
        if( this.identity == null ) {
          this._router.navigate([ "/login" ]);
        }else if( this.identity.role == 'user' ){
            this._router.navigate([ "/home" ]);
        }
    }

    getUnidadesRevision(){

        this.token = this._userService.getToken();
           
        if( this.token != null && this.token != ''){
           
            this._revisionService.obtRevisionUnidad( this.token )
                .subscribe(respRegiones => {
                    this.objUnidades            = respRegiones;
                    this.unidades               = this.objUnidades.data;
                    this.loaderUnidad           = false;
                });
        }
    }

    fileChangeImg(event) {
        this.fileToUploadImg = event.target.files[0];
    }

    fileChangeMaterial(event) {
        this.fileToUploadMat = event.target.files[0];
    }

    getCapChange( e ){
        this.token = this._userService.getToken();

        this._videosService.ObtCapitulosForm( e, this.token )
        .subscribe(data => {
            //this.objCapitulos = data;
            //this.capitulos = this.objCapitulos.data;
            

            this.disableCap = false;

        }, error => {
            console.log(error);
        });
    }

    onSubmit(){

        this.token = this._userService.getToken();
        let formData = new FormData();
        formData.append('nombre', this.revisionUnidadLista.nombre);
        formData.append('unidad', this.revisionUnidadLista.unidad);
        formData.append('suscripcion', this.revisionUnidadLista.suscripcion);
        formData.append('authorization', this.token);

        this._revisionService.IngRevisionLista(formData)
            .subscribe(data => {

                this.data = data;

                if( this.data.status == 'success' ){
                    swal({
                        title: 'Lista creada exitosamente',
                        text: 'Nuevo lista creada exitosamente.',
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


        }, error => {
              console.log(error);
        });
    }


}