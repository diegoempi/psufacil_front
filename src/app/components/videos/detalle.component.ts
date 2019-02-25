import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { VideosService }  from "../../services/videos.service";
import { NavComponent } from "../nav-p/nav-p.component";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: [],
  providers: [ UserService ]
})
export class DetalleComponent implements OnInit {
  
  public identity;
  public unidades;
  public objUnidades;
  public capitulos;
  public objCapitulos;
  public videos;
  public objVideos;
  public token;
  public title;

  constructor( 
    private _userService: UserService,
    private _router: Router,
    private aRoute: ActivatedRoute,
    private _videosService: VideosService
  ) { 

  }

  ngOnInit() {
    this.redirectIfIdentity();
    this.title = 'Reproducir';

    this.aRoute.params.forEach(( params: Params ) => {
        this.getVideos( params );
    });
    //this.getUnidades();



    //console.log( this.unidades);
  }

  redirectIfIdentity(){
    this.identity = this._userService.getIdentity();
    if( this.identity == null ) {
      this._router.navigate([ "/login" ]);
    }

  }

//    getVideos( params ){

  //  }
/*    getCapitulos( params ){

        console.log( params.id );
        this.token = this._userService.getToken();
 
        let formData = new FormData();
        formData.append('unidad', params.id);
        formData.append('authorization', this.token);



       
        if( this.token != null && this.token != ''){
       
            this._videosService.obtCapitulos( formData )
                .subscribe(respCapitulos => {
                    this.objCapitulos  = respCapitulos;
                    this.capitulos     = this.objCapitulos.data;

                    
                    console.log( this.capitulos );

                    if(this.objCapitulos.status != 'success'){
                        this._router.navigate([ "/home" ]);
                    }
                    
                });

        }
  }*/


  getVideos( params ){

    this.token = this._userService.getToken();
   
    if( this.token != null && this.token != ''){
   
        this._videosService.obtListaVideos( this.token, params.id )
            .subscribe(respVideos => {
                this.objVideos  = respVideos;
                this.videos     = this.objVideos.data;
       
                if(this.objVideos.status != 'success'){
                    //this._router.navigate([ "/home" ]);
                }
                
            });

    }
}


}