import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { NavComponent } from "../nav-p/nav-p.component";
import { User } from "../../models/user";


@Component({
  selector: 'app-adjust',
  templateUrl: './adjust.component.html',
  styleUrls: [],
  providers: [UserService]
})
export class AdjustComponent implements OnInit {
  
  public identity;
  public title: string;
  public user: User;
  public status;
  public objRegiones = <any>{ data: {} };
  public regiones = <any>[];
  public objComunas = <any>{ data: {} };
  public comunas = <any>[];
  public objColegios = <any>{ data: {} };
  public colegios = <any>[];
  public disableComuna = true;
  public disableColegio = true;
  public validaRut;

  constructor( 
    private _userService: UserService,
    private _router: Router
  ) { 

    this.user = new User(1,"Patricio","Seguel Moya","pato.seguel.moya@gmail.com","5","5101","1537","1986-11-13","","","123456","16.310.12","Hernan","Seguel B","hseguel@gmail.com","62696986","user");

  }

  
  ngOnInit() {
    this.redirectIfIdentity();
    this.title = 'Modificaciones de usuario';
  }

  redirectIfIdentity(){
    this.identity = this._userService.getIdentity();
    
    if( this.identity == null ) {
      this._router.navigate([ "/login" ]);
    }

  }


  onSubmit(){
    
  }

}
