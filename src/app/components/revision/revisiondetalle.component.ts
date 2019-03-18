import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { RevisionService }  from "../../services/revision.service";
import { VideosService }  from "../../services/videos.service";
import { NavComponent } from "../nav-p/nav-p.component";
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
    selector    : 'app-revisiondetalle',
    templateUrl : './revisiondetalle.component.html',
    styleUrls   : [],
    providers   : [ UserService, HttpClientModule ]
})

export class RevisionDetalleComponent implements OnInit {
  
    public identity;
    public unidades;
    public objUnidades;
    public token;
    public loading: boolean;
    public objRevisionDetalle;
    public revisionDetalle:any;

    public revision;
    public arrayRevision;
    public paramReq;
    public revisionReq;
    public listaReq;

    public alternativas;
    form: FormGroup;
    public respuestas=[];

    constructor( 
        private _userService: UserService,
        private _router: Router,
        private aRoute: ActivatedRoute,
        private _videosService: VideosService,
        private _revisionService:RevisionService,
        private _formBuilder:FormBuilder
    ) { 
        this.loading = true;
    }

    ngOnInit() {
        this.redirectIfIdentity();

        this.paramReq = this.aRoute.params.subscribe(params => {
            this.revisionReq = params['revision'];
            this.listaReq = params['lista'];
            this.getRevision(params);

            this.alternativas = ['A','B','C','D','E'];
        });
    }

    redirectIfIdentity(){
        this.identity = this._userService.getIdentity();
    
        if( this.identity == null ) {
            this._router.navigate([ "/login" ]);
        }

    }

    getRevision( params ){
        this.token      = this._userService.getToken();

        if( this.token != null && this.token != ''){
   
            this._revisionService.obtDetalleRevision( this.token, params )
                .subscribe(respRevisionDetalle => {
                    this.objRevisionDetalle     = respRevisionDetalle;
                    this.revisionDetalle        = this.objRevisionDetalle.data;  
                    this.loading                = false;
                 
                    //recorrer array y crear nuevo con las alternativas correctas
                    this.revisionDetalle.forEach(item => {
                        this.respuestas[item.id] = item.respuesta_user;
                    });

                    console.log( 'this.respuestas' );
                    console.log( this.respuestas );

                    if(this.objRevisionDetalle.status != 'success'){
                        this._router.navigate([ "/home" ]);
                    }                   
                });
        }      
    }

    onSubmit(){
        console.log('llega');
    }

}