import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";

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

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService
  ) {
      this.title = 'Identificate';
      this.user = {
        "rut":"1631012",
        "password":"123456",
        "getIdentity":"true"
      }
  }

  ngOnInit() {
    this.logout();
    this.redirectIfIdentity();
  }

  redirectIfIdentity(){
    let identity = this._userService.getIdentity();
    
    if( identity != null  && identity.sub) {
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

    
    this._userService.signup( this.user )
      .subscribe(
        response => { 
          this.identity = response;
         
          if( this.identity.length <= 1 ){
              console.log( 'Error en el servidor' );
          }{

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
                        //redirecciono a home
                        this._router.navigate([ "/home" ]);
                      }
                    }
                  },
                  error => {
                    console.log(<any>error);
                  }
                );
            }else{

            }
          }
      },
      error => {
                console.log(<any>error);
            }
        );
}

}
