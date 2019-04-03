import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
//import { UserService }  from "./user.service";


@Injectable({
    providedIn: 'root'
})

export class RevisionService{
    public url: string;
    public identity;
    public token;

    constructor( 
        private _http: HttpClient,
        //private _userService: UserService

    ){
       this.url = GLOBAL.url;
    }

    //obtengo revision para card
    obtRevision( token ){
        let params = "authorization=" + token;
        let url2 = this.url + '/obt/revision';

        return this._http.post( url2,params,  { headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') })
            .map(resp => {console.log(resp);return resp;  });
    }

    //obtengo revision para listado 
    obtListaRevision( token, revision ){
        let params = "authorization=" + token + "&revision="+ revision;
        let url2 = this.url + '/obt/revision/lista/';

        return this._http.post( url2,params,  { headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') })
            .map(resp => {console.log(resp);return resp;  });
    }

    //obtengo revision para detalle
    obtDetalleRevision( token, revision ){
        let params = "authorization=" + token + "&revision="+ revision.revision + "&lista=" + revision.lista;
        let url2 = this.url + '/obt/revision/detalle/';

        return this._http.post( url2, params,  { headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') })
            .map(resp => {return resp;  });
    }


    IngRevisionUnidad( formData ){
        let url2 = this.url + '/ing/adm/unidades';
    
        return this._http.post( url2, formData )
            //.set('Content-Type', 'application/json') })
            .map(resp => {;return resp;  });
    }

    //obtengo unidades para cargar cmb en 
    obtRevisionUnidad( token ){
        let params = "authorization=" + token;
        let url2 = this.url + '/obt/adm/revision/listas';
    
        return this._http.post( url2, params, { headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') })
            .map(resp => {;return resp;  });
    }

    //ingresa nueva lista
    IngRevisionLista( formData ){
        let url2 = this.url + '/ing/adm/revision/listas';
    
        return this._http.post( url2, formData )
            .map(resp => {;return resp;  });
            //.set('Content-Type', 'application/json') })
            
    }

    obtRevisionLista( unidad, token ){
        let params = "authorization=" + token + "&unidad=" + unidad;
        let url2 = this.url + '/obt/adm/revision/list';
    
        return this._http.post( url2, params, { headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') })
            .map(resp => {;return resp;  });
    }

    IngRevision( formData ){
        let url2 = this.url + '/ing/adm/revision';
    
        return this._http.post( url2, formData )
            .map(resp => {;return resp;  });
    }

    IngRevisionAlumno( formData ){
        let url2 = this.url + '/ing/revision';
    
        return this._http.post( url2, formData )
            .map(resp => {;return resp;  });
    }


}