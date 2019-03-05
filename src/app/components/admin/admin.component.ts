import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { NavComponent } from "../nav-p/nav-p.component";
import { User } from "../../models/user";
import { AdminUnidadComponent } from "../admin/adminUnidad.component"


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [],
  providers: [UserService]
})
export class AdminComponent implements OnInit {
    
    public identity;
    public title;

    constructor( 
        private _userService: UserService,
        private _router: Router
    ){

        this.title = 'Administrador';

    }

    ngOnInit() {
        this.redirectIfIdentity();
    }

    redirectIfIdentity(){
        this.identity = this._userService.getIdentity();
       
        if( this.identity == null ) {
          this._router.navigate([ "/login" ]);
        }else if( this.identity.role == 'user' ){
            this._router.navigate([ "/home" ]);
        }
    
    }


}