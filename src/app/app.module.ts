import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MascotasListComponent } from './components/principal/mascotas-list/mascotas-list.component';
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LoginComponent } from './components/login/login.component';

import { MascotaService } from './services/mascota.service';
import { RegistroComponent } from './components/registro/registro.component';
import { HeaderPrincipalComponent } from './components/principal/header-principal/header-principal.component';
import { CrearMascotaComponent } from './components/principal/crear-mascota/crear-mascota.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { FormAdopcionComponent } from './components/principal/form-adopcion/form-adopcion.component'; 
import { ChatComponent } from './components/principal/chat-list/chat.component';
import { PrincipalAdminComponent } from './components/principal-admin/principal-admin.component';
import { HomeAdminComponent } from './components/principal-admin/home-admin/home-admin.component';
import { ModalSolicitudComponent } from './components/principal-admin/modal-solicitud/modal-solicitud.component';
import { PerrosAdminComponent } from './components/principal-admin/perros-admin/perros-admin.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PrincipalComponent,
    LoginComponent,
    RegistroComponent,
    MascotasListComponent,
    HeaderPrincipalComponent,
    CrearMascotaComponent,
    FormAdopcionComponent,
    ChatComponent,
    PrincipalAdminComponent,
    HomeAdminComponent,
    ModalSolicitudComponent,
    PerrosAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ MascotaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
