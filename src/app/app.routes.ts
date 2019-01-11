import { RouterModule, Routes } from '@angular/router';
import { HomeWComponent } from "./components/home-w/home-w.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

const APP_ROUTES: Routes = [
	// { path: 'home', component: HomeWComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: '', component: HomeWComponent, pathMatch: 'full' },
	{ path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:false } );