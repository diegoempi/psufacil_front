import { RouterModule, Routes } from '@angular/router';
import { HomeWComponent } from "./components/home-w/home-w.component";
import { Form1WComponent } from "./components/form1-w/form1-w.component";
import { Form2WComponent } from "./components/form2-w/form2-w.component";


const APP_ROUTES: Routes = [
	{ path: 'home', component: HomeWComponent },
	{ path: 'form1', component: Form1WComponent },
	{ path: 'form2', component: Form2WComponent },
	{ path: '', component: HomeWComponent, pathMatch: 'full' },
	{ path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true } );