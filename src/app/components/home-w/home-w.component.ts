import { Component, OnInit } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-home-w',
  templateUrl: './home-w.component.html',
  styleUrls: ['./home-w.component.css'],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class HomeWComponent implements OnInit {

  becaForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.becaForm = this.fb.group({

    });
    
  }

  ngOnInit() {
    
  }

}
