import { Component, OnInit, Input, HostListener,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { RevisionService }  from "../../services/revision.service";
import { VideosService }  from "../../services/videos.service";
import { NavComponent } from "../nav-p/nav-p.component";
import { User } from "../../models/user";
//import { AdminUnidadComponent } from "../admin/adminUnidad.component"
import { Unidad } from "../../models/unidad";
import { RevisionUnidad } from "../../models/revisionUnidad";
import { GLOBAL } from '../../services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import swal from'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from "@angular/forms";


@Component({
  selector: 'app-admin-revision-unidad',
  templateUrl: './adminRevisionUnidad.component.html',
  styleUrls: [],
  providers: [UserService]
})
export class AdminRevisionUnidadComponent implements OnInit {
    @ViewChild('fileInput') fileInput;   
    public identity;
    public title;
    public token;
    public revisionUnidad: RevisionUnidad;
    public fileToUploadImg;
    public fileToUploadMat;
    public formData:any;
    public url;
    public disableCap = true;

    public data:any = { status:{} };

    constructor( 
        private _userService: UserService,
        private _router: Router,
        private _http: HttpClient,
        private _revisionService: RevisionService,
        private _videosService: VideosService
    ){
        this.url = GLOBAL.url;
        this.title = 'Administrador Revisión Unidades';
        this.revisionUnidad = new RevisionUnidad(0,'','','','0');

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

    fileChangeImg(event) {
        this.fileToUploadImg = event.target.files[0];
    }

    onSubmit(){

        this.token = this._userService.getToken();
        let formData = new FormData();
        formData.append('nombre', this.revisionUnidad.nombre);
        formData.append('descripcion', this.revisionUnidad.descripcion);
        formData.append('imagen', this.fileToUploadImg);
        formData.append('authorization', this.token);
        formData.append('suscripcion', this.revisionUnidad.suscripcion);

        //console.log( this.revisionUnidad );

        this._revisionService.IngRevisionUnidad(formData)
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