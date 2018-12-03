import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_ROUTING } from "./app.routes";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
    Form2WComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
