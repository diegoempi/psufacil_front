import { Component, OnInit, Input, HostListener,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { VideosService }  from "../../services/videos.service";
import { NavComponent } from "../nav-p/nav-p.component";
import { User } from "../../models/user";
import { Unidad } from "../../models/unidad";
import { Capitulo } from "../../models/capitulos";
import { GLOBAL } from '../../services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import swal from'sweetalert2';

import { FormBuilder, FormGroup, Validators, FormControl, Form } from "@angular/forms";

@Component({
  selector: 'app-admin-capitulo',
  templateUrl: './adminCapitulo.component.html',
  styleUrls: [],
  providers: [UserService, VideosService]
})
export class AdminCapituloComponent implements OnInit {
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
        private _http: HttpClient
    ){
        this.url = GLOBAL.url;
        this.title = 'Administrador Capitulos';
        this.capitulo = new Capitulo(1,'','','','');
    }

    ngOnInit() {
        this.getCapitulos();
        this.getUnidades();
    }

    getUnidades(){

        this.token = this._userService.getToken();
           
        if( this.token != null && this.token != ''){
           
            this._videosService.obtUnidades( this.token )
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
           
            this._videosService.obtCapitulos( this.token )
                .subscribe(respRegiones => {
                    this.objCapitulos  = respRegiones;
                    this.capitulos     = this.objCapitulos.data;
           
                    /*if(this.objUnidades.status != 'success'){
                        this._router.navigate([ "/home" ]);
                    }*/
                    
                });
        }
    }

    fileChange(event) {


        console.log( event );

        this.fileToUpload = event.target.files[0];
/*

        let elemento = event.target;
        let url2 = this.url + '/ing/unidades';

        if( elemento.files.length > 0 ){
            let formData = new FormData;
            //formData.append('file', elemento.files[0]);

            this.file = e.target.files[0];


            this._http.post(url2,formData)
            .subscribe( ( data ) => {
                //let jsonRes = data.json();
                console.log( data );
            },(error) => console.log(error.message));


        }*/
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



    subeImg( event: EventTarget ){


        
        //const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        //const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        //const files: FileList = target.files;

        //this.formData = new FormData();

  /*for (let i = 0; i < files.length; i++) {
    this.formData.append('file', files[i]);
  }*/

  //console.log(JSON.stringify(this.formData));



        //let fileList: FileList = event.target.files; 

        //this.fileToUpload = files.item(0);


        //console.log(fileList);


          //  let file: File = fileList[0];   
            //let fileSize:number=fileList[0].size;  

            //let formData:FormData = new FormData();  
            //formData.append('Document',file);  


        //let formData = new FormData();
        //formData.append('file_upload', this.fileToUpload, 'hola.jpg');

        /*formData.forEach ((valor, clave) => { 
            console.log ("clave% s: valor% s", clave, valor); 
            })*/

        //console.log(formData);
    }

    onSubmit(){

        this.token = this._userService.getToken();
        let url2 = this.url + '/ing/unidades';      
        let formData = new FormData();
        formData.append('imagen', this.fileToUpload);
        formData.append('nombre', this.capitulo.nombre);
        formData.append('descripcion', this.capitulo.descripcion);
        formData.append('unidad', this.capitulo.unidad);
        formData.append('authorization', this.token);
          

        this._videosService.IngCapitulo(formData)
            .subscribe(data => {

                this.data = data;

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