import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Mascota } from 'src/app/models/mascota';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  API_URL:string ='https://appdogapp-1655094073294.azurewebsites.net/mascotas';
  
  constructor(private http: HttpClient) { }
  private urlApi = '';

  getMascotas(){
    return this.http.get(`${this.API_URL}/listar`);
  }

  getMascota(id : String){
    return this.http.get(`${this.API_URL}/buscar/${id}`);
  }

  deleteMascota(id : number){
    this.urlApi = `${this.API_URL}/eliminar/${id}`;
    return this.http.delete(this.urlApi);
  }
  
  saveMascotas(mascot: Mascota):Observable<Mascota>{
    return this.http.post<Mascota>(`${this.API_URL}/guardar`, mascot);
  }

//updateMascota(id : String, updateMascot: Mascota )
  updateMascota(updateMascot: Mascota){ //PASAR EL ID
    ///return this.http.put(`${this.API_URL}/mascotas/${id}`, updateMascot);
    return this.http.put(`${this.API_URL}/actualizar`, updateMascot);
  }

}
