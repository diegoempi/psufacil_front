import { Component, OnInit, Input, HostListener,ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { NavComponent } from "../nav-p/nav-p.component";
import { User } from "../../models/user";
import { AdminUnidadComponent } from "../admin/adminUnidad.component";
import { RevisionService }  from "../../services/revision.service";
//import { VideosService }  from "../../services/videos.service";
import { Video } from "../../models/videos";
import { Unidad } from "../../models/unidad";
import { GLOBAL } from '../../services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import swal from'sweetalert2';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-revision',
  templateUrl: './adminRevision.component.html',
  styleUrls: [],
  providers: [UserService]
})
export class AdminRevisionComponent implements OnInit {
    @ViewChild('fileInput') fileInput;
    
    public forma: FormGroup;

    public identity;
    public title;
    public token;
    public unidad: Unidad;
    public video: Video;
    public fileToUploadImg;
    public fileToUploadMat;
    public formData:any;
    public url;

    public disableList          = false;
    public loaderUnidad         = true;

    public unidades;
    public objUnidades;
    public listas;
    public objCapitulos;
    public videos;
    public objVideos;

    public data:any = { status:{} };


    public invoiceForm: FormGroup;


    constructor( 
        private _userService: UserService,
        private _router: Router,
        private _http: HttpClient,
        private _revisionService:RevisionService,
        private _fb: FormBuilder
    ){
        /*this.forma = new FormGroup({
            unidad: new FormControl(''),
            lista: new FormControl({ value:'', disabled: this.disableList }),
            suscripcion: new FormControl('0'),
            preguntas: new FormArray([])
        });*/



        this.url = GLOBAL.url;
        this.title = 'Administrador Revisión';
        this.unidad = new Unidad(1,'','','','');
        

    }

    ngOnInit() {  
        this.redirectIfIdentity();
        this.getUnidadesRevision();

        this.invoiceForm = this._fb.group({
            unidad: new FormControl(''),
            lista: new FormControl(''),
            suscripcion: new FormControl('0'),
            itemRows: this._fb.array([this.initItemRows()])
          });
       
    }


    get formArr() {
        return (<FormArray>this.invoiceForm.get('itemRows'));
    }
    
    initItemRows() {
        return this._fb.group({
          correcta: ['']
        });
    }
    
    addNewRow() {
        this.formArr.push(this.initItemRows());
    }
    
    deleteRow(index: number) {
        this.formArr.removeAt(index);
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

        console.log( e );

        this.token = this._userService.getToken();

        this._revisionService.obtRevisionLista( e, this.token )
        .subscribe(data => {
            this.objCapitulos   = data;
            this.listas         = this.objCapitulos.data;    
            this.disableList    = false;           
        }, error => {
            console.log(error);
        });
    }

    agregarPregunta(){

        (<FormArray>this.forma.controls['preguntas']).push(
            new FormControl('')
        )

        console.log( this.forma.value);
    }

    onSubmit(){

        console.log(this.invoiceForm.value);

        this.token = this._userService.getToken();
        let formData = new FormData();
        let flag = JSON.stringify( this.invoiceForm.value.itemRows);


        formData.append('unidad', this.invoiceForm.value.unidad);
        formData.append('lista', this.invoiceForm.value.lista);
        formData.append('suscripcion', this.invoiceForm.value.suscripcion);
        formData.append('alternativas', flag);
        formData.append('authorization', this.token );


        this._revisionService.IngRevision(formData)
            .subscribe(data => {

                this.data = data;

                if( this.data.status == 'success' ){
                    swal({
                        title: 'Revision creada exitosamente',
                        text: 'Nueva revisión creada exitosamente.',
                        type: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'ok!'
                    }).then((result) => {
                        if (result.value) {

                        //window.location.href = '/admin';

                        }
                    })

                    this.invoiceForm.reset();
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