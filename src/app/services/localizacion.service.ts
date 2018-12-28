import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  url = "http://localhost:8000/";

  constructor(private http: HttpClient){}

  getComuna( regionSeleccionada ){
    let url2 = this.url + 'obt/comuna/'+regionSeleccionada;
    return this.http.get( url2 )
      .map(resp => { return resp; });
  }

  getRegion(){
    let url2 = this.url + 'obt/region';   
    return this.http.get( url2 )
      .map(resp => { return resp; });
  }


  getColegio( comunaSeleccionada ){
    let url2 = this.url + 'obt/colegio/'+comunaSeleccionada;
    return this.http.get( url2 )
      .map(resp => { return resp; });
  }

  grabaBeca( becaForm  ){
    let url2 = this.url + 'ing/beca';

    let data = { 
        "alNombres": becaForm.value.alumno.nombres,
        "alApeMat": becaForm.value.alumno.apellido1,
        "alApePat": becaForm.value.alumno.apellido2,
        "alNacimiento": becaForm.value.alumno.fechanac,
        "alEmail": becaForm.value.alumno.correo,
        "alTelefono": becaForm.value.alumno.telefono,
        "alRut": becaForm.value.alumno.rut,
        "alRegion": becaForm.value.alumno.region,
        "alComuna": becaForm.value.alumno.comuna,
        "alColegio": becaForm.value.alumno.colegio,
        "apNombres": becaForm.value.apoderado.nombres,
        "apApeMat": becaForm.value.apoderado.apellido1, 
        "apApePat": becaForm.value.apoderado.apellido2,
        "apEmail": becaForm.value.apoderado.correo,
        "apTelefono": becaForm.value.apoderado.telefono,
        "razonesBeca": becaForm.value.apoderado.comentario
    };

    let json = JSON.stringify(data); 

    return this.http.post( url2, json )
      .map(resp => { return resp; }); 
  }

    grabaInfo( infoForm ){
      let url2 = this.url + 'ing/info';

      let data = {
          "nombre": infoForm.value.nombre,
          "email": infoForm.value.correo,
          "telefono": infoForm.value.telefono,
          "mensaje": infoForm.value.mensaje
      };
  
      let json = JSON.stringify(data); 
  
      return this.http.post( url2, json )
        .map(resp => { return resp; }); 
    }




}