import { Injectable } from "@angular/core";
import { LoginI} from  '../models/login.interface';
import { ResponseI } from "../models/response.interface";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs"; 
import { User } from "../models/usuario";
import { Adopcion } from "../models/adopcion";
import { RegistroI } from "../models/registro.interface";


@Injectable({
    providedIn:'root'
})
export class ApiService{
    
    url: string = 'https://appdogapp-1655094073294.azurewebsites.net';
    
    constructor(private http:HttpClient) { }
    

    loginByEmail( form : LoginI) : Observable<User>{

        let dir = this.url+"/usuarios/login"; 
        console.log("ruta : ", dir);
        return this.http.post<User>(dir,form);
        console.log(form);
    }

    registroUser( form : RegistroI) : Observable<ResponseI>{

        let dir = this.url+"/usuarios"; 
        console.log("ruta : ", dir);
        return this.http.post<ResponseI>(dir,form);
        console.log(form);
    }

    logout() {
        /*this.usuario = {};
        return this.authService.signOut();*/
    }

    enviarMensaje(adopcion:Adopcion):Observable<Adopcion> {
        return this.http.post<Adopcion>(`${this.url}/enviaremail`, adopcion);
    }
}