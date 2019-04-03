import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { VideosService }  from "../../services/videos.service";
import { NavComponent } from "../nav-p/nav-p.component";
import {HttpClientModule} from '@angular/common/http';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: [],
  providers: [UserService, HttpClientModule]
})
export class VideosComponent implements OnInit {
  
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

  ) { 
      this.url = GLOBAL.url;
      this.loading = true;
  }

  ngOnInit() {
    this.redirectIfIdentity();
    this.getUnidades();



    //console.log( this.unidades);
  }

  redirectIfIdentity(){
    this.identity = this._userService.getIdentity();
    if( this.identity == null ) {
      this._router.navigate([ "/login" ]);
    }

  }

  getUnidades(){

    this.token = this._userService.getToken();

       
    if( this.token != null && this.token != ''){
       
        this._videosService.obtUnidades( )
            .subscribe(respRegiones => {
                this.objUnidades  = respRegiones;
                this.unidades     = this.objUnidades.data;

                //console.log( this.unidades );
                this.loading = false;
                if(this.objUnidades.status != 'success'){
                    this._router.navigate([ "/home" ]);
                }
                
            });
  }
          

          /*  this.token = respToken;
            if(respToken != null){
               /* this._videosService.obtUnidades( this.token )
                .subscribe(respRegiones => {
                    this.objUnidades  = respRegiones;
                    this.unidades     = this.objUnidades.data;
            
                    if(this.objUnidades.status != 'success'){
                        this._router.navigate([ "/home" ]);
                    }
                   
                });
        }*/


        //});

  }

}
