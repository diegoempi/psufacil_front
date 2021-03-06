import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { GlobalService } from "../../services/global";
import swal from'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {
  @ViewChild('loginForm') formValues;
  
  public title: string;
  public user;
  public identity;
  public token;
  public code;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _globalService: GlobalService
  ) {
      this.title = 'Identifícate';
      this.user = {
        "rut":"",
        "password":"",
        "getIdentity":"true"
      }
  }

  ngOnInit() {
    this.logout();
    this.redirectIfIdentity();
  }

  redirectIfIdentity(){
    this.identity = this._userService.getIdentity();
    
    if( this.identity != null  && this.identity.sub) {
      this._router.navigate([ "/home" ]);
    }

  }

  logout(){
    this._route.params.forEach(( params: Params ) => {
        let logout = +params['id'];
        
        if( logout == 1 ){
            localStorage.removeItem( 'identity' );
            localStorage.removeItem( 'token' );
            this.identity = null;
            this.token = null;

            this._router.navigate([ "/login" ]);
            //window.location.href = '/login';
        }

    });
  }

  onSubmit(){

    this.user.getIdentity = true;

    if( this.formValues.form.value.nombre != '' && this.formValues.form.value.password != '' ){

      this._userService.signup( this.user )
      .subscribe(
        response => {
          this.identity = response;

          if( this.identity.status == null){
            this.identity = null;
            this.code = 401;
            this._globalService.alertSweet( this.code );
          }else{

            if( this.identity.status ){
              localStorage.setItem( 'identity', JSON.stringify( this.identity ));
                
                //GET TOKEN
                this.user.getIdentity = null;
                this._userService.signup( this.user )
                .subscribe(
                  response => {
                    this.token = response;
                      
                    if( this.identity.length <= 1 ){
                        console.log( 'Error en el servidor' );
                    }{
                      if( this.identity.status ){
                        //guardo token en ls
                        localStorage.setItem( 'token', JSON.stringify( this.token ));
                        this.formValues.resetForm();

                        this.code = 201;
                        this._globalService.alertSweet( this.code );
                        
/*                        setTimeout(() => {
                          //this._router.navigate([ "/home" ]);
                          //this.timeout();
                      }, 2000);
*/
                        
                      }
                    }
                  },
                  error => {
                    //error del servidor
                    this.code = 501;
                    this._globalService.alertSweet( this.code );
                  }
                );
            }else{

            }
          
        }
      },
      error => {
        //error del servidor
        this.code = 501;
        this._globalService.alertSweet( this.code );
      }
    );


    }else{
      this.code = 401;
      this._globalService.alertSweet( this.code );
    }
    

}

}
