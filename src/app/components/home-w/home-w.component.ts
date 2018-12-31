import { Component, OnInit, OnChanges } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from "@angular/forms";
import * as rutHelpers from 'rut-helpers';
import { fillProperties } from '@angular/core/src/util/property';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-home-w',
  templateUrl: './home-w.component.html',
  styleUrls: ['./home-w.component.css'],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class HomeWComponent implements OnInit, OnChanges {

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
  public errorMsjInfo = '';
  public validaRut = <any>'';
  public disabledComuna = true;
  
  public disabledColegios = true;

  constructor(private fb: FormBuilder, private localizacion: LocalizacionService ) {

    this.becaForm = this.fb.group({
      alumno: this.fb.group({
        nombres: new FormControl('',      [ Validators.required,
                                            Validators.minLength(3) ]),
        apellido1: new FormControl('',    [ Validators.required,
                                            Validators.minLength(3) ]),
        apellido2: new FormControl('',    [ Validators.required,
                                            Validators.minLength(3) ]),
        fechanac: new FormControl('',     [ Validators.required,
                                            Validators.minLength(3) ]),
        correo: new FormControl('',       [ Validators.required,
                                            Validators.minLength(3),
                                            Validators.email ]),
        telefono: new FormControl('',     [ Validators.required,
                                            Validators.minLength(5) ]),
        rut: new FormControl('',          [ Validators.required ]),
        region: new FormControl('',       [ Validators.required ]),
        comuna: new FormControl('',       [ Validators.required ]),
        colegio: new FormControl('',      [ Validators.required ]),
      }),

      apoderado: this.fb.group({
        nombres: new FormControl('',      [ Validators.required,
                                            Validators.minLength(3)]),
        apellido1: new FormControl('',    [ Validators.required,
                                            Validators.minLength(3)]),
        apellido2: new FormControl('',    [ Validators.required,
                                            Validators.minLength(3)]),
        correo: new FormControl('',       [ Validators.required, 
                                            Validators.email]),
        telefono: new FormControl('',     [ Validators.required,
                                            Validators.minLength(3)]),
        comentario: new FormControl('',   [ Validators.required,
                                            Validators.minLength(3)])
      }),

    });
  
    this.infoForm = this.fb.group({
      nombre: new FormControl('',   [ Validators.required,
                                      Validators.minLength(3) ]),
      correo: new FormControl('',   [ Validators.required, 
                                      Validators.email ]),
      telefono: new FormControl('', [ Validators.required, 
                                      Validators.minLength(7) ]),
      mensaje: new FormControl('',  [ Validators.required,
                                      Validators.minLength(3) ])
    });


    
    //this.becaForm['controls'].alumno['controls'].colegios.disable();
    
    this.localizacion.getRegion()
      .subscribe(respRegiones => {
        this.objRegiones  = respRegiones;
        this.regiones     = this.objRegiones.data;
        this.becaForm['controls'].alumno['controls'].comuna.disable();
        this.becaForm['controls'].alumno['controls'].colegio.disable();
      });


  }

  ngOnInit() {

  }
  
  ngOnChanges() {
    console.log(this.becaForm.status);
  }

  validForm(): void {
    console.log(this.becaForm.status);
  }

  guardarCambios(){

    
    console.log(this.becaForm);

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

  validateRut ( control: FormControl ): { [ s:string ]:boolean }{
    this.validaRut = rutHelpers.rutValidate( this.becaForm['controls'].alumno['controls'].rut.value);
    return this.validaRut;
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
    this.becaForm['controls'].alumno['controls'].colegio.disable();
    this.becaForm['controls'].alumno['controls'].comuna.disable();
    this.colegios = [];
    this.comunas = [];
    this.becaForm['controls'].alumno['controls'].colegio.setValue("");
    this.becaForm['controls'].alumno['controls'].comuna.setValue("");

    if(this.regionSeleccionada != ''){
      this.localizacion.getComuna( this.regionSeleccionada )
      .subscribe( respComunas => {
        this.becaForm['controls'].alumno['controls'].comuna.enable();
        this.objComunas = respComunas;
        for(let key in this.objComunas.data){
          if(this.objComunas.data.hasOwnProperty(key)){
            this.comunas.push(this.objComunas.data[key]);
          }
         }
         this.disabledColegios = false;
      });
    }
  }

  getColegios(){
    this.comunaSeleccionada = this.becaForm.value.alumno.comuna;

    if(this.comunaSeleccionada != ''){

      this.localizacion.getColegio( this.comunaSeleccionada )
      .subscribe( respColegios => {
        this.becaForm['controls'].alumno['controls'].colegio.enable();
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