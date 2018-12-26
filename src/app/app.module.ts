import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_ROUTING } from "./app.routes";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//validators

import { Ng2Rut } from "ng2-rut";

//servicios

import { LocalizacionService } from "./services/localizacion.service";

//componentes
import { AppComponent } from './app.component';
import { HomeWComponent } from './components/home-w/home-w.component';
import { Form1WComponent } from './components/form1-w/form1-w.component';
import { Form2WComponent } from "./components/form2-w/form2-w.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeWComponent,
    Form1WComponent,
    Form2WComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Rut,
    APP_ROUTING
  ],
  providers: [LocalizacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
