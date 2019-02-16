import { Component, OnInit, Input, HostListener,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { VideosService }  from "../../services/videos.service";
import { NavComponent } from "../nav-p/nav-p.component";
import { User } from "../../models/user";
import { Video } from "../../models/videos";
import { Unidad } from "../../models/unidad";
import { GLOBAL } from '../../services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import { FormBuilder, FormGroup, Validators, FormControl, Form } from "@angular/forms";

@Component({
  selector: 'app-admin-video',
  templateUrl: './adminVideo.component.html',
  styleUrls: [],
  providers: [UserService, VideosService]
})
export class AdminVideoComponent implements OnInit {
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
    

    constructor( 
        private _userService: UserService,
        private _router: Router,
        private _videosService: VideosService,
        private _http: HttpClient
    ){
        this.url = GLOBAL.url;
        this.title = 'Administrador Videos';
        this.unidad = new Unidad(1,'','','');
        this.video = new Video(1,'','','','','','','');
    }

    ngOnInit() {
        this.getUnidades();
    }

    getUnidades(){

        this.token = this._userService.getToken();
           
        if( this.token != null && this.token != ''){
           
            this._videosService.obtUnidades( this.token )
                .subscribe(respRegiones => {
                    this.objUnidades  = respRegiones;
                    this.unidades     = this.objUnidades.data;
    
                    console.log( this.unidades );
            
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



        /*
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            let formData:FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            let headers = new Headers();
            /** In Angular 5, including the header Content-Type can invalidate your request */
          /*  headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');



            let url2 = this.url + '/ing/unidades';

            console.log(formData.get('uploadFile'));

            const httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json'
                })
              };

              console.log( httpOptions );

            return this._http.post(url2, { headers: httpOptions, body: formData})
            .map(resp => {;return resp;  });
            //.map(res => res.json())
            //.catch(error => Observable.throw(error))
            //.subscribe(
            //    data => console.log('success'),
            //    error => console.log(error)
            //)
    }*/

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
        formData.append('imagen', this.fileToUploadImg);
        formData.append('material', this.fileToUploadMat);
        formData.append('nombre', this.video.nombre);
        formData.append('descripcion', this.video.descripcion);
        formData.append('url', this.video.url);
        formData.append('unidad', this.video.unidad);
        formData.append('capitulo', this.video.capitulo);
        formData.append('authorization', this.token);

        console.log( this.video );

        this._videosService.IngVideo(formData)
            .subscribe(data => {
            // do something, if upload success
        }, error => {
              console.log(error);
        });

          //console.log(formData);


          /*interface IFoo{
            nombre:string;
            descripcion:string;
            imagen:any;
            token:string
        }*/
        
        // How I tend to intialize 
        //var foo:IFoo = <any>{};

        //foo.imagen = Object.assign(formData);

        //foo.imagen = formData;
        //foo.nombre = this.unidad.nombre;
        //foo.descripcion = this.unidad.descripcion;
        
        //foo.token = this.token;



      /*  this._http.post( url2, formData) 
        .subscribe( ( data ) => {
          console.log( data );
        });
*/


/*
          console.log(formData);

          interface IFoo{
              nombre:string;
              descripcion:string;
              imagen:any;
              token:string
          }
          
          // How I tend to intialize 
          var foo:IFoo = <any>{};
          
          foo.nombre = this.unidadForm.nombre;
          foo.descripcion = this.unidadForm.descripcion;
          foo.imagen = this.unidadForm;
          foo.token = this.token;


*/


          //console.log(formData.get('uploadFile'));

         /* const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type':  'application/x-www-form-urlencoded'
              })
            };
*/
            //console.log( httpOptions );

        //}
        //fileReader.readAsText(this.fileToUpload);



        /*this.token = this._userService.getToken();
       
        if( this.token != null && this.token != ''){



 
            console.log(this.formData);

            this._videosService.IngUnidad(this.formData,this.unidad, this.token )
            .subscribe(data => {
                // do something, if upload success
                
            }, error => {
                console.log(error);
            });
        }*/
    }


    /*redirectIfIdentity(){
        this.identity = this._userService.getIdentity();

        console.log( this.identity );
        
        if( this.identity == null ) {
          this._router.navigate([ "/login" ]);
        }
    
    }*/


}