import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService }  from "../../services/user.service";
import { NavComponent } from "../nav-p/nav-p.component";

@Component({
  selector: 'app-home-p',
  templateUrl: './home-p.component.html',
  styleUrls: ['./home-p.component.css'],
  providers: [UserService]
})
export class HomePComponent implements OnInit {
  
  public identity;

  constructor( 
    private _userService: UserService,
    private _router: Router,
    private aRoute: ActivatedRoute
  ) { 

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
