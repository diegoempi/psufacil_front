import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService }  from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class MaterialService {
  public url: string;
  public identity;
  public token;

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) { 
    this.url = GLOBAL.url;
  }

  IngUnidad( formData ){
    let url2 = this.url + '/ing/adm/material/unidad';
    return this._http.post( url2, formData )
        //.set('Content-Type', 'application/json') })
      .map(resp => {;return resp;  });
  }

  ObtUnidad( token ){
    let url2 = this.url + '/obt/adm/material/unidad';
    return this._http.post( url2, token )
    //.set('Content-Type', 'application/json') })
    .map(resp => {;return resp;  });
  }

  IngCapitulo( formData ){

    console.log( formData );
    let url2 = this.url + '/ing/adm/material/capitulo';

    return this._http.post( url2, formData )
        //.set('Content-Type', 'application/json') })
        .map(resp => {;return resp;  });
  }

  ObtCapitulosForm( unidad, token ){
    let params  = "unidad="+unidad+'&authorization='+token;
    let url2    = this.url + '/obt/adm/material/capitulo';

    return this._http.post( url2,params,  { headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded') })
      .map(resp => {;return resp;  });
  }

  IngMaterial( formData ){
    let url2 = this.url + '/ing/adm/material';

    return this._http.post( url2, formData )
        //.set('Content-Type', 'application/json') })
        .map(resp => {;return resp;  });
  }

  ObtMaterial( formData ){
    let url2 = this.url + '/obt/material';

    return this._http.post( url2, formData )
        //.set('Content-Type', 'application/json') })
        .map(resp => {;return resp;  });
  }

}
