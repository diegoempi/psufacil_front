import { Component, OnInit, OnChanges } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from "@angular/forms";

import { fillProperties } from '@angular/core/src/util/property';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { RutValidator } from 'ng2-rut';



@Component({
  selector: 'app-home-w',
  templateUrl: './home-w.component.html',
  styleUrls: ['./home-w.component.css'],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class HomeWComponent implements OnInit, OnChanges {

  becaForm: FormGroup;
  infoForm: FormGroup;

  constructor(private fb: FormBuilder, private localizacion: LocalizacionService, rutValidator: RutValidator ) {

    this.becaForm = this.fb.group({
      alumno: this.fb.group({
        nombres: new FormControl('', Validators.required),
        apellido1: new FormControl('', Validators.required),
        apellido2: new FormControl('', Validators.required),
        fechanac: new FormControl('', Validators.required),
        correo: new FormControl('', [Validators.required, Validators.email]),
        telefono: new FormControl('', Validators.required),
        rut: new FormControl('', [Validators.required]),
        region: new FormControl('', []),
        comuna: new FormControl('', []),
        colegio: new FormControl('', [])
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
  
  ngOnChanges() {
    console.log(this.becaForm.status);
  }

  validForm(): void {
    console.log(this.becaForm.status);
  }

  guardarCambios(){
    console.log(this.becaForm);
  }

}
