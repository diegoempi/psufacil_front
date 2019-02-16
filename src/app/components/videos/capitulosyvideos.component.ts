import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { VideosService }  from "../../services/videos.service";
import { NavComponent } from "../nav-p/nav-p.component";

@Component({
  selector: 'app-capitulosyvideos',
  templateUrl: './capitulosyvideos.component.html',
  styleUrls: [],
  providers: [UserService]
})
export class CapitulosYVideosComponent implements OnInit {
  
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
    this.title = 'Capitulos';

    this.aRoute.params.forEach(( params: Params ) => {
        this.getCapitulos( params );
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

    getCapitulos( params ){

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
  }


  getVideos( params ){

    this.token = this._userService.getToken();
   
    if( this.token != null && this.token != ''){
   
        this._videosService.obtVideos( this.token, params )
            .subscribe(respVideos => {
                this.objVideos  = respVideos;
                this.videos     = this.objVideos.data;

                console.log( this.videos);
        
                if(this.objVideos.status != 'success'){
                    this._router.navigate([ "/home" ]);
                }
                
            });

    }
}


}