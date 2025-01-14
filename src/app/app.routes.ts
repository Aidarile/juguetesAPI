import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JuguetesListComponent } from './components/juguetes-list/juguetes-list.component';
import { AddjugueteComponent } from './components/addjuguete/addjuguete.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: 'Inicio',
    component: HomeComponent,
  },
  {
    path: 'listado',
    title: 'Catálogo',
    component: JuguetesListComponent
  },
  {
    path: 'add',
    title: 'Añadir Juguete',
    component: AddjugueteComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
