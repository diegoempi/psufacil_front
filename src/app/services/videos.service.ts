import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { UserService }  from "./user.service";


@Injectable({
    providedIn: 'root'
})

export class VideosService{
    public url: string;
    public identity;
    public token;

    constructor( 
        private _http: HttpClient,
        private _userService: UserService

    ){
       this.url = GLOBAL.url;
    }

    //obtengo unidades 
    obtUnidades(){
        let token       = this._userService.getToken();
        let identity    = this._userService.getIdentity();
        let params      = "authorization=" + token + "&usr_suscripcion="+ identity.usr_suscripcion;
        let url2        = this.url + '/obt/unidades';

        return this._http.post( url2,params,  { headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') })
            .map(resp => {console.log(resp);return resp;  });
    }

    obtAdmUnidades(){
        let token       = this._userService.getToken();
        let identity    = this._userService.getIdentity();
        let params      = "authorization=" + token;
        let url2        = this.url + '/obt/adm/unidades';

        return this._http.post( url2,params,  { headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') })
            .map(resp => {console.log(resp);return resp;  });
    }



    obtCapitulosDetalle( formData ){

        let url2 = this.url + '/obt/capitulos';

        let params = "authorization="+formData.authorization+"&unidad="+formData.unidad+"&usr_suscripcion="+formData.usr_suscripcion;

        return this._http.post( url2,params,  { headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') })
            .map(resp => {;return resp;  });

    }




    obtListaVideos( token, capitulo ){

        let identity    = this._userService.getIdentity();
        let params = "authorization="+token+"&capitulo="+capitulo+"&usr_suscripcion="+identity.usr_suscripcion;

        let url2 = this.url + '/obt/videos';

        return this._http.post( url2,params,  { headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') })
            .map(resp => {;return resp;  });

    }


    

    obtVideosTodos( token ){
        //this.token = this._userService.getToken();

        let params = "authorization="+token;

        let url2 = this.url + '/obt/videos/todos';

        return this._http.post( url2,params,  { headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') })
            .map(resp => {;return resp;  });
    }

    //obtengo capitulo
    obtAdmCapitulos( token ){

        let params = "authorization="+token;

        let url2 = this.url + '/obt/adm/capitulos';

        return this._http.post( url2,params,  { headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') })
            .map(resp => {;return resp;  });
    }

    obtVideos( token, capitulo ){
        let params = "capitulo="+capitulo+'&authorization='+token;
        let url2 = this.url + '/obt/videos';

        return this._http.post( url2,params,  { headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') })
            .map(resp => {;return resp;  });
    }

    ObtCapitulosForm(unidad, token){
        let params = "unidad="+unidad+'&authorization='+token;
        let url2 = this.url + '/obt/adm/capitulos';

        return this._http.post( url2,params,  { headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') })
            .map(resp => {;return resp;  });
    }
    
    IngVideo( formData ){
        let url2 = this.url + '/ing/videos';

        return this._http.post( url2, formData )
            //.set('Content-Type', 'application/json') })
            .map(resp => {;return resp;  });
    }


    IngUnidad( formData ){

        //console.log(fileToUpload);
        //let formData= new FormData();
        //formData.append('file', fileToUpload);
        //unidad = JSON.stringify(unidad);

        //var data = new FormData();
        //data.append('key', 'value');
        console.log(formData);


        //let params = "data="+JSON.stringify(unidad)+'&authorization='+token+"&file"+fileToUpload ;
        //let params = "data="+fileToUpload.get('file');
        //console.log( JSON.stringify( params ) );

        let url2 = this.url + '/ing/unidades';

        return this._http.post( url2, formData )
            //.set('Content-Type', 'application/json') })
            .map(resp => {;return resp;  });
        }


        IngCapitulo( formData ){

            console.log(formData);
       
            let url2 = this.url + '/ing/capitulos';
    
            return this._http.post( url2, formData )
                //.set('Content-Type', 'application/json') })
                .map(resp => {;return resp;  });
            }
        

    /*    const endpoint = 'your-destination-url';
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        return this.httpClient
          .post(endpoint, formData, { headers: yourHeadersConfig })
          .map(() => { return true; })
          .catch((e) => this.handleError(e));
    }*/

}