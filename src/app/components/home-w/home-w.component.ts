import { Component, OnInit } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from "@angular/forms";

import { fillProperties } from '@angular/core/src/util/property';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { RutValidator } from 'ng2-rut';
import swal from'sweetalert2';

@Component({
  selector: 'app-home-w',
  templateUrl: './home-w.component.html',
  styleUrls: ['./home-w.component.css'],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class HomeWComponent implements OnInit {

  becaForm: FormGroup;
  infoForm: FormGroup;
  public objRegiones = <any>{ data: {} };
  public regiones = <any>[];
  public objComunas = <any>{ data: {} };
  public comunas = <any>[];
  public objColegios = <any>{ data: {} };
  public colegios = <any>[];
  public objbeca = <any>{ data: {} };
  public beca = <any>{ data: {} };
  public regionSeleccionada = '';
  public comunaSeleccionada = '';

  constructor(private fb: FormBuilder, private localizacion: LocalizacionService, rutValidator: RutValidator ) {

    this.localizacion.getRegion()
      .subscribe(respRegiones => {
        this.objRegiones  = respRegiones;
        this.regiones     = this.objRegiones.data;
      });


    this.becaForm = this.fb.group({
      alumno: this.fb.group({
        nombres: new FormControl('', Validators.required),
        apellido1: new FormControl('', Validators.required),
        apellido2: new FormControl('', Validators.required),
        fechanac: new FormControl('', Validators.required),
        correo: new FormControl('', [Validators.required, Validators.email]),
        telefono: new FormControl('', Validators.required),
        rut: new FormControl('', [Validators.required]),
        region: new FormControl('', [Validators.required]),
        comuna: new FormControl('', [Validators.required]),
        colegio: new FormControl('', [Validators.required])
      }),

      apoderado: this.fb.group({
        nombres: new FormControl('', Validators.required),
        apellido1: new FormControl('', Validators.required),
        apellido2: new FormControl('', Validators.required),
        correo: new FormControl('', [Validators.required, Validators.email]),
        telefono: new FormControl('', Validators.required),
        comentario: new FormControl('', Validators.required)
      }),

    });
  
    this.infoForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

  }

  validForm(): void {
    console.log(this.becaForm.status);
  }

  guardarCambios(){
 
    if( this.becaForm.status == 'VALID' ){

      this.localizacion.grabaBeca( this.becaForm  )
      .subscribe( respBeca => {
        this.objbeca = respBeca;
        this.beca = this.objbeca.code;

        if( this.beca == '200' ){
          swal({
            type: 'success',
            title: 'Gracias',
            text: 'Pronto nos contactaremos contigo'
          })
          
          this.becaForm.reset();

        }  
      });
    }
  }

  guardarCambiosInfo(){

    if( this.infoForm.status == 'VALID' ){

      this.localizacion.grabaInfo( this.infoForm  )
      .subscribe( respBeca => {
        this.objbeca = respBeca;
        this.beca = this.objbeca.code;

        if( this.beca == '200' ){
          swal({
            type: 'success',
            title: 'Gracias',
            text: 'Pronto nos contactaremos contigo'
          })
          
          this.infoForm.reset();

        }  
      });
    }

  }

  getComunas(){
    this.regionSeleccionada = this.becaForm.value.alumno.region;
    this.colegios = [];
    this.comunas = [];
    if(this.regionSeleccionada != ''){
      this.localizacion.getComuna( this.regionSeleccionada )
      .subscribe( respComunas => {
        this.objComunas = respComunas;
        for(let key in this.objComunas.data){
          if(this.objComunas.data.hasOwnProperty(key)){
            this.comunas.push(this.objComunas.data[key]);
          }
         }
      });
    }
  }

  getColegios(){
    this.comunaSeleccionada = this.becaForm.value.alumno.comuna;

    if(this.comunaSeleccionada != ''){

      this.localizacion.getColegio( this.comunaSeleccionada )
      .subscribe( respColegios => {

        this.colegios = [];
        this.objColegios = respColegios;
        for(let key in this.objColegios.data){
          if(this.objColegios.data.hasOwnProperty(key)){
            this.colegios.push(this.objColegios.data[key]);
          }
         }
      });
    }

  }

}