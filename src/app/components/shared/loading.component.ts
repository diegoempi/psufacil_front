import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: [],
  providers: []
})
export class LoadingComponent implements OnInit {

    public title;

    constructor(){
    }

    ngOnInit() {
        this.title = 'loader work';
    }
}

