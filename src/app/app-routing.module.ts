import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MascotasListComponent } from './components/principal/mascotas-list/mascotas-list.component';

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CrearMascotaComponent } from './components/principal/crear-mascota/crear-mascota.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { UserGuard } from './guards/user.guard';
import { FormAdopcionComponent } from './components/principal/form-adopcion/form-adopcion.component';
import { ChatComponent } from './components/principal/chat-list/chat.component';
import { AdminGuard } from './guards/admin.guard';
import { HomeAdminComponent } from './components/principal-admin/home-admin/home-admin.component';
import { PrincipalAdminComponent } from './components/principal-admin/principal-admin.component';

import { ModalSolicitudComponent } from './components/principal-admin/modal-solicitud/modal-solicitud.component';
import { PerrosAdminComponent } from './components/principal-admin/perros-admin/perros-admin.component';

const routes: Routes = [
  { path: 'home' , component: HomeComponent},
  { path: '' , component: HomeComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'registroUsuario' , component: RegistroComponent},
  {path: 'principal', component: PrincipalComponent, children: [
      { path: '', redirectTo: 'listado', pathMatch: 'full' },
      { path: 'listado' , component: MascotasListComponent},
      { path: 'chat' , component: ChatComponent},
      { path: 'registroMascota' , component: CrearMascotaComponent},
      { path: 'formAdopcion/:id' , component: FormAdopcionComponent},
    ],canActivate:[UserGuard]
  },
  { path: 'interfaz-admin', component: PrincipalAdminComponent, children: [
    { path: '', redirectTo: 'home-admin', pathMatch: 'full' },
    { path: 'home-admin', component: HomeAdminComponent},
    { path: 'mascotas-admin', component: PerrosAdminComponent},
    { path: '**', redirectTo: 'home-admin' }
  ],canActivate:[AdminGuard]}
];
//{ path: 'listado/:idUser' , component: MascotasListComponent},
//{ path: 'listado/edit/:id/:nombre/:tipo' , component: MascotasListComponent},
//{ path: '**', redirectTo: '/', pathMatch: 'full'},
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
