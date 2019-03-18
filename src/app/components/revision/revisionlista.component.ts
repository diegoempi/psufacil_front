import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { VideosService }  from "../../services/videos.service";
import { RevisionService }  from "../../services/revision.service";
import { NavComponent } from "../nav-p/nav-p.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector    : 'app-revisionlista',
    templateUrl : './revisionlista.component.html',
    styleUrls   : [],
    providers   : [ UserService, HttpClientModule ]
})

export class RevisionListaComponent implements OnInit {
  
    public identity;
    public unidades;
    public objUnidades;
    public token;
    public loading: boolean;
    public revisionLista;
    public revisionesLista;
    public selectedRevision;
    public lista;

    constructor( 
        private _userService: UserService,
        private _router: Router,
        private aRoute: ActivatedRoute,
        private _videosService: VideosService,
        private _revisionService: RevisionService
    ) { 
        this.loading = true;
        this.revisionesLista = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    }

    ngOnInit() {
        this.redirectIfIdentity();

        this.aRoute.params.forEach(( params: Params ) => {
            this.getRevision( params );
            this.lista = params.id;
        });

    }

    redirectIfIdentity(){
        this.identity = this._userService.getIdentity();
    
        if( this.identity == null ) {
            this._router.navigate([ "/login" ]);
        }

    }

    getRevision( params ){
        //this.token      = this._revisionService.obtRevision;
        this.token      = this._userService.getToken();
        this._revisionService.obtListaRevision( this.token, params.id )
        .subscribe(
          response => {
            this.revisionLista      = response;
            this.revisionesLista    = this.revisionLista.data;           
            this.loading    = false;

            if(this.revisionLista.status != 'success'){
                this._router.navigate([ "/home" ]);
            }
        })         
    }
}