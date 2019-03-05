import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_ROUTING } from "./app.routes";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//validators

import { Ng2Rut } from "ng2-rut";

//Interceptors

import { AuthInterceptor } from "./interceptors/auth-interceptor";
//servicios

import { LocalizacionService } from "./services/localizacion.service";
import { VideosService } from "./services/videos.service";
import { GlobalService } from "./services/global";

//componentes
import { AppComponent } from './app.component';
import { HomeWComponent } from './components/home-w/home-w.component';
import { Form1WComponent } from './components/form1-w/form1-w.component';
import { Form2WComponent } from "./components/form2-w/form2-w.component";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomePComponent } from './components/home-p/home-p.component';
import { NavComponent } from './components/nav-p/nav-p.component';
import { AdjustComponent } from './components/adjust/adjust.component';
import { VideosComponent } from './components/videos/videos.component';
import { CapitulosYVideosComponent } from './components/videos/capitulosyvideos.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminUnidadComponent } from './components/admin/adminUnidad.component';
import { AdminCapituloComponent } from './components/admin/adminCapitulo.component';
import { VideosListaComponent } from "./components/videos/videoslista.component";

import { AdminVideoComponent } from './components/admin/adminVideo.component';

import { DetalleComponent } from './components/videos/detalle.component';
import { MatriculaComponent } from './components/matricula/matricula.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeWComponent,
    Form1WComponent,
    Form2WComponent,
    LoginComponent,
    RegisterComponent,
    HomePComponent,
    NavComponent,
    AdjustComponent,
    VideosComponent,
    CapitulosYVideosComponent,
    AdminComponent,
    AdminUnidadComponent,
    AdminCapituloComponent,
    VideosListaComponent,
    AdminVideoComponent,
    DetalleComponent,
    MatriculaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Rut,
    APP_ROUTING,
    HttpClientModule
  ],
  providers: [
    LocalizacionService,
    VideosService,
    GlobalService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
