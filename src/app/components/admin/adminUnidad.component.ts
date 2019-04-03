import { Component, OnInit, Input, HostListener,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { VideosService }  from "../../services/videos.service";
import { NavComponent } from "../nav-p/nav-p.component";
import { User } from "../../models/user";
import { Unidad } from "../../models/unidad";
import { GLOBAL } from '../../services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import swal from'sweetalert2';

import { FormBuilder, FormGroup, Validators, FormControl, Form } from "@angular/forms";

@Component({
  selector: 'app-admin-unidad',
  templateUrl: './adminUnidad.component.html',
  styleUrls: [],
  providers: [UserService, VideosService]
})
export class AdminUnidadComponent implements OnInit {
    @ViewChild('fileInput') fileInput;
    public identity;
    public title;
    public token;
    public unidad: Unidad;
    public fileToUpload;
    public formData:any;
    public url;
    public data:any = { status:{} };
    public suscripciones;


    public unidades;
    public objUnidades;

    constructor( 
        private _userService: UserService,
        private _router: Router,
        private _videosService: VideosService,
        private _http: HttpClient
    ){
        this.url = GLOBAL.url;
        this.title = 'Administrador Unidades (videos)';
        this.unidad = new Unidad(1,'','','','0');
        this.suscripciones = ['Gratis','Anual', 'Intensiva'];
    }

    ngOnInit() {
        this.redirectIfIdentity();
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
           
        if( this.token != null && this.token != ''){
           
            this._videosService.obtUnidades()
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

    fileChange(event) {
        this.fileToUpload = event.target.files[0];
    }


    onSubmit(){

        this.token = this._userService.getToken();
        //let url2 = this.url + '/ing/unidades';      
        let formData = new FormData();

        console.log(this.unidad);
        formData.append('imagen', this.fileToUpload);
        formData.append('nombre', this.unidad.nombre);
        formData.append('descripcion', this.unidad.descripcion);
        formData.append('authorization', this.token);
        formData.append('suscripcion', this.unidad.suscripcion);
          

        this._videosService.IngUnidad(formData)
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