import { RouterModule, Routes } from '@angular/router';
import { HomeWComponent } from "./components/home-w/home-w.component";

const APP_ROUTES: Routes = [
	{ path: 'home', component: HomeWComponent },
	{ path: '', component: HomeWComponent, pathMatch: 'full' },
	{ path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:false } );