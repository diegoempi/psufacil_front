import { Component, OnInit, Input, HostListener,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { NavComponent } from "../nav-p/nav-p.component";
import { User } from "../../models/user";
import { AdminUnidadComponent } from "../admin/adminUnidad.component"
import { VideosService }  from "../../services/videos.service";
import { Video } from "../../models/videos";
import { Unidad } from "../../models/unidad";
import { GLOBAL } from '../../services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import swal from'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [],
  providers: [UserService]
})
export class AdminComponent implements OnInit {
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

    public unidades;
    public objUnidades;
    public capitulos;
    public objCapitulos;
    public videos;
    public objVideos;

    public data:any = { status:{} };

    constructor( 
        private _userService: UserService,
        private _router: Router,
        private _videosService: VideosService,
        private _http: HttpClient
    ){

        this.url = GLOBAL.url;
        this.title = 'Administrador Videos';
        this.unidad = new Unidad(1,'','','','');
        this.video = new Video(1,'','','','','','','0');

    }

    ngOnInit() {
        this.redirectIfIdentity();
        this.getUnidades();
        this.getVideosTodos();
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
           
        if( this.token != null && this.token != ''){
           
            this._videosService.obtAdmUnidades()
                .subscribe(respRegiones => {
                    this.objUnidades  = respRegiones;
                    this.unidades     = this.objUnidades.data;
                });
        }
    }

    getVideosTodos(){

        this.token = this._userService.getToken();
           
        if( this.token != null && this.token != ''){
           
            this._videosService.obtVideosTodos( this.token )
                .subscribe(respVideos => {
                    this.objVideos  = respVideos;
                    this.videos     = this.objVideos.data;
          
                    /*if(this.objUnidades.status != 'success'){
                        this._router.navigate([ "/home" ]);
                    }*/
                    
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
            this.objCapitulos = data;
            this.capitulos = this.objCapitulos.data;
            

            this.disableCap = false;

        }, error => {
            console.log(error);
        });

    }

    onSubmit(){

        this.token = this._userService.getToken();
        let formData = new FormData();
        formData.append('material', this.fileToUploadMat);
        formData.append('nombre', this.video.nombre);
        formData.append('descripcion', this.video.descripcion);
        formData.append('url', this.video.url);
        formData.append('unidad', this.video.unidad);
        formData.append('capitulo', this.video.capitulo);
        formData.append('authorization', this.token);
        formData.append('suscripcion', this.video.suscripcion);

        this._videosService.IngVideo(formData)
            .subscribe(data => {

                this.data = data;

                if( this.data.status == 'success' ){
                    swal({
                        title: 'Video creado exitosamente',
                        text: 'Nuevo video creado exitosamente.',
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