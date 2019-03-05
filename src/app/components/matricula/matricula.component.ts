import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { GlobalService } from "../../services/global";
import swal from'sweetalert2';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: [],
  providers: [UserService]
})

export class MatriculaComponent implements OnInit {
  
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
      this.title = 'Matricula';
  }

  ngOnInit() {
    this.redirectIfIdentity();
  }

  redirectIfIdentity(){
    this.identity = this._userService.getIdentity();
    
    if( this.identity == null ) {
        this._router.navigate([ "/login" ]);
      }

  }
}