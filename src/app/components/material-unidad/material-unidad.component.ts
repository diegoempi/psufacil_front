import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { VideosService }  from "../../services/videos.service";
import { NavComponent } from "../nav-p/nav-p.component";
import {HttpClientModule} from '@angular/common/http';
import { GLOBAL } from '../../services/global';
import { MaterialService } from "../../services/material.service";


@Component({
  selector: 'app-material-unidad',
  templateUrl: './material-unidad.component.html',
  styleUrls: ['./material-unidad.component.css']
})
export class MaterialUnidadComponent implements OnInit {
  public identity;
  public unidades;
  public objUnidades;
  public token;
  public loading: boolean;
  public url;

  constructor(    
    private _userService: UserService,
    private _router: Router,
    private aRoute: ActivatedRoute,
    private _videosService: VideosService,
    private _materialService:MaterialService){
      this.url = GLOBAL.url;
      this.loading = true;
    }

  ngOnInit(){
    this.redirectIfIdentity();
    this.getUnidades();
  }

  redirectIfIdentity(){
    this.identity = this._userService.getIdentity();
    if( this.identity == null ) {
      this._router.navigate([ "/login" ]);
    }

  }


  getUnidades(){
    this.token = this._userService.getToken();
    let formData = new FormData();
    formData.append('authorization', this.token);

       
    if( this.token != null && this.token != ''){
      this._materialService.ObtUnidad( formData )
        .subscribe(respRegiones => {
          this.objUnidades  = respRegiones;
          this.unidades     = this.objUnidades.data;
          this.loading = false;
          if(this.objUnidades.status != 'success'){
            //this._router.navigate([ "/home" ]);
          }
      });
    }
  }


}
