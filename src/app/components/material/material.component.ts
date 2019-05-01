import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute,Params } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { VideosService }  from "../../services/videos.service";
import { NavComponent } from "../nav-p/nav-p.component";
import {HttpClientModule} from '@angular/common/http';
import { GLOBAL } from '../../services/global';
import { MaterialService } from "../../services/material.service";

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  public identity;
  public materiales;
  public objMaterial;
  public token;
  public loading: boolean;
  public url;

  constructor(    
    private _userService: UserService,
    private _router: Router,
    private aRoute: ActivatedRoute,
    private _videosService: VideosService,
    private _materialService:MaterialService) { 
      this.url = GLOBAL.url;
      this.loading = true;
    }

  ngOnInit() {
    this.redirectIfIdentity();
    
    this.aRoute.params.forEach(( params: Params ) => {
      this.getMaterial( params );
    });
  }

  redirectIfIdentity(){
    this.identity = this._userService.getIdentity();
    if( this.identity == null ) {
      this._router.navigate([ "/login" ]);
    }
  }

  getMaterial( params ){

    this.token = this._userService.getToken();
    let formData = new FormData();
    formData.append('authorization', this.token);
    formData.append('unidad', params.id);
       
    if( this.token != null && this.token != ''){
      this._materialService.ObtMaterial( formData )
        .subscribe(respRegiones => {
          this.objMaterial  = respRegiones;
          this.materiales   = this.objMaterial.data;
          this.loading = false;
          if(this.objMaterial.status != 'success'){
            //this._router.navigate([ "/home" ]);
          }
      });
    }
  }
}