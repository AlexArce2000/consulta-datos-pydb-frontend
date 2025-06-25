import { provideRouter, Routes } from '@angular/router';
import { ConsultaListarComponent } from './consulta/consulta-listar/consulta-listar.component';
import { ApplicationConfig } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


export const routes: Routes = [
    {
        path:'consulta', component: ConsultaListarComponent
    },
    {
        path: '',
        redirectTo: 'consulta',
        pathMatch: 'full'
    }
];
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
}
