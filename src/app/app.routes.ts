import { RouterModule, Routes } from '@angular/router';
import { HomeWComponent } from "./components/home-w/home-w.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomePComponent } from "./components/home-p/home-p.component";
import { AdjustComponent } from "./components/adjust/adjust.component";
import { VideosComponent } from "./components/videos/videos.component"
import { CapitulosYVideosComponent } from "./components/videos/capitulosyvideos.component";
import { AdminComponent } from "./components/admin/admin.component";
import { VideosListaComponent } from "./components/videos/videoslista.component";
import { DetalleComponent } from "./components/videos/detalle.component";

const APP_ROUTES: Routes = [
	{ path: 'web', component: HomeWComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'login/:id', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'user/adjust/:id', component: AdjustComponent },
	{ path: 'videos/unidades', component: VideosComponent },
	{ path: 'videos/capitulos/:id', component: CapitulosYVideosComponent },
	{ path: 'videos/lista/:id', component: VideosListaComponent },
	{ path: 'videos/detalle/:id', component: DetalleComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: 'home', component: HomePComponent },
	{ path: '', component: HomeWComponent, pathMatch: 'full' },
	{ path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:false } );