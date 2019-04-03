import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { RevisionService }  from "../../services/revision.service";
import { VideosService }  from "../../services/videos.service";
import { NavComponent } from "../nav-p/nav-p.component";
import { HttpClientModule } from '@angular/common/http';
import { GLOBAL } from '../../services/global';


@Component({
    selector    : 'app-revision',
    templateUrl : './revision.component.html',
    styleUrls   : [],
    providers   : [ UserService, HttpClientModule ]
})

export class RevisionComponent implements OnInit {
  
    public identity;
    public unidades;
    public objUnidades;
    public token;
    public loading: boolean;
    public revisiones;
    public revision;
    public url;
    public invoiceForm;

    constructor( 
        private _userService: UserService,
        private _router: Router,
        private aRoute: ActivatedRoute,
        private _videosService: VideosService,
        private _revision: RevisionService
    ) { 
        this.url = GLOBAL.url;
        this.loading = true;
        this.revisiones = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    }

    ngOnInit() {
        this.redirectIfIdentity();
        this.getRevision();
    }

    redirectIfIdentity(){
        this.identity = this._userService.getIdentity();
    
        if( this.identity == null ) {
            this._router.navigate([ "/login" ]);
        }

    }



    getRevision(){
        this.token      = this._userService.getToken();
        this._revision.obtRevision( this.token )
        .subscribe(
          response => {
            this.revision = response;
            this.revisiones = this.revision.data;
            this.loading    = false;

            if( this.revision.status != 'success' ){
                this._router.navigate([ "/login" ]);
            }

          })  


        
    }
}