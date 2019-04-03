import { RouterModule, Routes } from '@angular/router';
import { HomeWComponent } from "./components/home-w/home-w.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomePComponent } from "./components/home-p/home-p.component";
import { AdjustComponent } from "./components/adjust/adjust.component";
import { VideosComponent } from "./components/videos/videos.component"
import { CapitulosYVideosComponent } from "./components/videos/capitulosyvideos.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminUnidadComponent } from "./components/admin/adminUnidad.component";
import { AdminCapituloComponent } from "./components/admin/adminCapitulo.component";
import { AdminRevisionComponent } from "./components/admin/adminRevision.component";
import { AdminRevisionUnidadComponent } from "./components/admin/adminRevisionUnidad.component";
import { AdminRevisionCapituloComponent } from "./components/admin/adminRevisionCapitulo.component";
import { VideosListaComponent } from "./components/videos/videoslista.component";
import { DetalleComponent } from "./components/videos/detalle.component";
import { MatriculaComponent } from "./components/matricula/matricula.component";
import { RevisionComponent } from "./components/revision/revision.component";
import { RevisionListaComponent } from "./components/revision/revisionlista.component";
import { RevisionDetalleComponent } from "./components/revision/revisiondetalle.component";

const APP_ROUTES: Routes = [
	{ path: 'web', component: HomeWComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'login/:id', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'user/adjust/:id', component: AdjustComponent },
	{ path: 'videos', component: VideosComponent },
	{ path: 'videos/capitulos/:id', component: CapitulosYVideosComponent },
	{ path: 'videos/lista/:id', component: VideosListaComponent },
	{ path: 'videos/detalle/:id', component: DetalleComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: 'admin/unidad', component: AdminUnidadComponent },
	{ path: 'admin/capitulo', component: AdminCapituloComponent },
	{ path: 'admin/revision', component: AdminRevisionComponent },
	{ path: 'admin/revision/unidad', component: AdminRevisionUnidadComponent },
	{ path: 'admin/revision/lista', component: AdminRevisionCapituloComponent },
	{ path: 'matricula', component: MatriculaComponent },
	{ path: 'revision', component: RevisionComponent },
	{ path: 'revision/lista/:id', component: RevisionListaComponent },
	{ path: 'revision/detalle/:revision/:lista', component: RevisionDetalleComponent },
	{ path: 'home', component: HomePComponent },
	{ path: '', component: HomeWComponent, pathMatch: 'full' },
	{ path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:false } );