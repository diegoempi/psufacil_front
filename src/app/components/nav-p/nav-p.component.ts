import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { Location } from '@angular/common';
//import { identity } from 'rxjs';

@Component({
    selector: 'nav-p',
    templateUrl: './nav-p.component.html',
    providers: [UserService]
})

export class NavComponent implements OnInit {
    public id_user;  
    @Input() identity;

    constructor( public _router: Router, public _location: Location ){

    }

    ngOnInit() {
        this.id_user = this.identity;
        console.log(this.identity);
    }

  }
