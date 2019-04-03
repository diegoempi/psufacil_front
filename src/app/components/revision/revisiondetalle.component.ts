import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { RevisionService }  from "../../services/revision.service";
import { VideosService }  from "../../services/videos.service";
import { NavComponent } from "../nav-p/nav-p.component";
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Respuesta } from "../../models/respuestas";
import swal from'sweetalert2';

@Component({
    selector    : 'app-revisiondetalle',
    templateUrl : './revisiondetalle.component.html',
    styleUrls   : [],
    providers   : [ UserService, HttpClientModule ]
})

export class RevisionDetalleComponent implements OnInit {
  
    public identity;
    public unidades;
    public objUnidades;
    public token;
    public loading: boolean;
    public objRevisionDetalle:any = { completado:false };
    public objRevisionDetalleResponse;
    public revisionDetalleResponse;
    //public revisionDetalle:any;
    public showIcons: boolean[] = [true];

    public revision;
    public arrayRevision;
    public paramReq;
    public revisionReq;
    public listaReq;

    public alternativas;
    //form: FormGroup;
    forma:FormGroup;
    public respuestas=[];

    public qtd:any[] = [];
    public objRevision = [{}];

    //final
    public revisionDetalle:any;
    //

public control = [];

    checkboxGroup: FormGroup;
    foodArray: FormArray;

    //new
    public invoiceForm;

    name: string;
    questions: any[];
  
    form = new FormGroup({});

    constructor(
        private _userService: UserService,
        private _router: Router,
        private aRoute: ActivatedRoute,
        private _videosService: VideosService,
        private _revisionService:RevisionService,
        private _fb:FormBuilder
    ) { 
        this.loading = true;
    }
    
    public expense: string[];
    public expenseEditForm: FormGroup;   
    values: string[] = [];
      
    ngOnInit() {

   

        this.redirectIfIdentity();
        this.token      = this._userService.getToken();
             
        this.paramReq = this.aRoute.params.subscribe(params => {
            this.revisionReq = params['revision'];
            this.listaReq = params['lista'];

            this.alternativas = ['A','B','C','D','E'];

            this.expenseEditForm = this._fb.group({
                unidad: this.revisionReq,
                lista: this.listaReq,
                preguntasForm: this._fb.array([])
            })

            //console.log('declaracion form this.expenseEditForm');
            //console.log(this.expenseEditForm);

            let formData = new FormData();
      
            formData.append('unidad', this.revisionReq);
            formData.append('lista', this.listaReq);
            formData.append('authorization', this.token );

            this._revisionService.obtDetalleRevision( this.token, params )
                            .subscribe(respRevisionDetalle => {
                                this.objRevisionDetalle     = respRevisionDetalle;
                                this.revisionDetalle        = this.objRevisionDetalle.data;
                                //this.expense                = this.revisionDetalle;
                                //this.objRevision            = this.expense.data;

                                if(this.objRevisionDetalle.status  != 'success'){
                                    this._router.navigate([ "/home" ]);
                                } 

                                //declaro NGMODEL VARIABLE
                                let idx;
                                this.revisionDetalle.forEach(item => {
                                    //console.log( item.pregunta );
                                    
                                    //this.qtd[idx] = item;
                                    //console.log(this.qtd[idx]);
                                    //this.qtd.push(item);
                                    if( item.respuesta != ''){
                                        this.values.push(item.respuesta);
                                        this.showIcons.push(true);
                                    }else{
                                        this.values.push('');
                                    }

                                    //console.log(this.values);

                                    idx++;
                                });

                                this.loading                = false;

                                //console.log(this.values );

                              

                                    //let control: Array<String>= [];
                                    //const control = <FormArray>this.expenseEditForm.get('data');

                                    //const control = this.expenseEditForm.controls._attributes as FormArray;

                                   /* this.expense.forEach(x => {

                                        //console.log(x['id']);

                                      //control.push(this.patchValuess(x.respuesta, x.respuestaCorrecta, x.id))

                                      (<FormArray>this.expenseEditForm.controls.preguntasForm).push(this._fb.group({
                                        alternativas:       [x['alternativas']],
                                        respuesta:          x['respuesta'],
                                        id:                 x['id'],
                                        respuestaCorrecta:  x['respuestaCorrecta']
                                      }))

                                      

                                      //const control = <FormArray>this.expenseEditForm.controls['preguntasForm'];
                                        //control.push(this._fb.control( ['id','1'] ));


                                    })*/

                                    this.last();
                                    /*console.log('---------------------------->');
                                    console.log(this.expenseEditForm.controls.preguntasForm);
                                    */
                                 
                                
                                    //console.log('this.expenseEditForm.controls.respuestaCorrecta.controls');
                                    //console.log(this.expenseEditForm.controls.preguntasForm);


                                /*this.expense.forEach(x => {
                                    
                                    console.log(x );
                                
                                });*/
                                
                            })
        });
    }
    
    get preguntasFormArray(): FormArray {
        return this.expenseEditForm.get('preguntasForm') as FormArray;
    }

    last(){

    /*    const formArray = new FormArray([]);
        this.expenseEditForm.addControl('preguntasForm', formArray);
    
        for (let i = 0; i < this.expense.length; i++) {
          const formControl = new FormControl(); 
          formArray.push(formControl);
        }
*/

        
       /* this.expense.forEach(x => {

            console.log(x);
          
           

          /*  (<FormArray>this.expenseEditForm.controls.preguntasForm).push(this._fb.group({
            alternativas:       [x['alternativas']],
            respuesta:          x['respuesta'] = '',
            id:                 x['id'] = '',
            respuestaCorrecta:  x['respuestaCorrecta'] = ''
          }))
          */
       /* });*/
        
        //console.log("this.expenseEditForm.get('preguntasForm').controls");
        //console.log(this.expenseEditForm.get('preguntasForm').value);
    }


    patchValuess(label, value, id) {
        return this._fb.group({
          respuesta: [label],
          respuestaCorrecta: [value],
          id: [id]
        })


      }





/*
    patchForm() {

    this.expenseEditForm.patchValue({
        unidad: this.revisionReq,
      })

      console.log('dentro de funcion patchForm---> imprmiendo valor this.expenseEditForm.patchValue');
      console.log(this.expenseEditForm);

      this.setExpenseCategories()
    }
  */  
    setExpenseCategories(){
      let control = <FormArray>this.expenseEditForm.controls._attributes;
      this.expense.forEach(x => {
         
          //let id = x.id;
          //console.log('id');
          //console.log(id);
          //console.log('this.expenseEditForm.controls.expense_expense_categories_attributes.controls');
          //console.log(this.expenseEditForm.controls.expense_expense_categories_attributes.controls);
        //porque es _fb.group
        //control.push(this._fb.group({ id : x.id, respuestaCorrecta: x.respuestaCorrecta } ))
        //control.push(this._fb.group({ respuesta: {respuestaCorrecta: x.respuestaCorrecta } }))
      })

      //console.log(control);
    }



    /*get formArr() {
        return this.invoiceForm.get('itemRows') as FormArray;
      }
*/




  /*  ngOnInit() {





        this.redirectIfIdentity();
        this.token      = this._userService.getToken();
             
        this.paramReq = this.aRoute.params.subscribe(params => {
            this.revisionReq = params['revision'];
            this.listaReq = params['lista'];

            this.alternativas = ['A','B','C','D','E'];

            //Generar FormGroup y FormArray
            this.invoiceForm = this._fb.group({
                unidad: new FormControl(''),
                lista: new FormControl(''),
                suscripcion: new FormControl('0'),
                itemRows: this._fb.array([

                    this._revisionService.obtDetalleRevision( this.token, params )
                    .subscribe(respRevisionDetalle => {
                        this.objRevisionDetalle     = respRevisionDetalle;
                        this.revisionDetalle        = this.objRevisionDetalle.data;  
                        this.loading                = false;
                     
                        this.revisionDetalle.forEach(item => {


                            //this.formArr.push(this._fb.group({point:''}));

                            //armo array
                            this.formArr.push(
                                this._fb.group({
                                    pregunta:  item.pregunta ,
                                    respuestaCorrecta:  item.respuestaCorrecta,
                                    respuesta:  '' 
                                }
                            ))


                            //this.sellingPoints.push(this.fb.group({point:''}));


                        })
    
                        this.formArr.value.shift();
                        this.formArr.controls.shift();

                        /*console.log('this.formArr');
                        console.log(this.formArr);
                        console.log('this.invoiceForm.controls.itemRows.controls.value');
                        console.log(this.invoiceForm.controls.itemRows.controls.value);
                        console.log('this.formArr.controls');
                        console.log(this.formArr.controls);
                        */
/*                        

                        return this.formArr.controls;
                    })

                ])
            }); //this.invoiceForm cierre

            //console.log('after oninit this.invoiceForm');
            //console.log(this.invoiceForm);



        });

        console.log('this.invoiceForm');
        console.log(this.invoiceForm);

    }*/

    redirectIfIdentity(){
        this.identity = this._userService.getIdentity();
    
        if( this.identity == null ) {
            this._router.navigate([ "/login" ]);
        }

    }

    get formArr() {
        return this.invoiceForm.get('itemRows') as FormArray;
      }


    /*  
    getRevision( params ){

        this.token      = this._userService.getToken( );

        if( this.token != null && this.token != ''){
   
            this._revisionService.obtDetalleRevision( this.token, params )
                .subscribe(respRevisionDetalle => {
                    this.objRevisionDetalle     = respRevisionDetalle;
                    this.revisionDetalle        = this.objRevisionDetalle.data;  
                    this.loading                = false;
                 

                                  
                    this.revisionDetalle.forEach(item => {
                        //armo array
                        this.formArr.push(this._fb.group({
                            pregunta: [ item.pregunta ],
                            respuestaCorrecta: [ item.respuestaCorrecta ]
                        }))

                    })


                    //return this._fb;
                    
                    //recorrer array y crear nuevo con las alternativas correctas
                    /*this.revisionDetalle.forEach(item => {

                        //item.ud = new Respuesta(item.id,item.respuesta_user);
//                        this.respuestas[item.id] = item.respuesta_user;

                        (<FormArray>this.forma.controls['respuestas']).push(
                            new FormControl(item.respuesta_user)
                        )

                    });*/

                    //console.log( this.forma.controls['respuestas'] );
                    //console.log( this.respuestas );

        /*            if(this.objRevisionDetalle.status != 'success'){
                        //this._router.navigate([ "/home" ]);
                    }                   */
             /*   });
        }    
    }*/

    onSubmit(){

        let request = { respuestas: '' };

        this.values.forEach(item => {
           request.respuestas =  request.respuestas.concat( item + '|' );
        });

        request.respuestas = request.respuestas.slice(0, -1);
        

        let formData = new FormData();
      
        formData.append('unidad', this.revisionReq);
        formData.append('lista', this.listaReq);
        formData.append('authorization', this.token );
        formData.append('respuestas', request.respuestas );
        formData.append('usr_suscripcion', this.identity.usr_suscripcion );
        formData.append('id_usuario', this.identity.sub );


        this._revisionService.IngRevisionAlumno( formData )
            .subscribe(respRevisionResponse => {
                this.objRevisionDetalleResponse = respRevisionResponse;
                this.revisionDetalleResponse    = this.objRevisionDetalleResponse.data;
                
                if( this.objRevisionDetalleResponse.status == 'success' ){
                    swal({
                        title: 'Respuestas enviadas exitosamente',
                        text: 'Éxito.',
                        type: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'ok!'
                    }).then((result) => {
                        if (result.value) {

                        window.location.href = '/revision/detalle/'+this.revisionReq+'/'+this.listaReq;

                        }
                    })

                    //this.invoiceForm.reset();
                }


                console.log(this.objRevisionDetalleResponse);
            })

        //IngRevisionAlumno( formData ){
        
        console.log(request);

       // (<FormArray>this.forma.controls['preguntas']).push(
       //   new FormControl('')
       // )

        
    }

    handleChange( e ){
        this.showIcons[e] = false;
        console.log( e );
    }

}