import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form2-w',
  templateUrl: './form2-w.component.html',
  styleUrls: ['./form2-w.component.css']
})
export class Form2WComponent implements OnInit {

  becaForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    
    
    this.becaForm = this.fb.group({
      alumno: this.fb.group({
        alNombres: [''],
        alApellidoP: [''],
        alApellidoM: [''],
        alRut: [''],
        alNacimiento: ['']

      }),
      apoderado: this.fb.group({
        apNombres: [''],
        apApellidoP: [''],
        apApellidoM: [''],
        apRut: [''],
        apTelefono: ['']
      }),
      comentarioBeca: ['']

    });

    console.log(this.becaForm);
  
  
  }

  ngOnInit() {
  }

}
