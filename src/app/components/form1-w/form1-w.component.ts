import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-form1-w',
  templateUrl: './form1-w.component.html',
  styleUrls: ['./form1-w.component.css']
})
export class Form1WComponent {
  infoForm: FormGroup;
  tipos = [
    {id: 1, nombre: 'Apoderado'},
    {id: 2, nombre: 'Alumno'}
  ];

  
  
  constructor(private fb: FormBuilder) { 
  
    //crea un array con un formControl para cada orden

    const controls = this.tipos.map(c => new FormControl(false));


    this.infoForm = this.fb.group({
      nombre: ['',
    Validators.required],
      correo: ['',
    Validators.required],
      tipos: new FormArray(controls, validatorCheckboxes())
    });



  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.infoForm);
  }

}

function validatorCheckboxes() {
    const validator: ValidatorFn = (FormArray: FormArray) => {
      const totalSelected = FormArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

      return totalSelected == 1 ? null : {required: true};
    };
    
    return validator;
}
