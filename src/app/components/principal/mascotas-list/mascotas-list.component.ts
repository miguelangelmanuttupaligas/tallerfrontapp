import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Mascota } from 'src/app/models/mascota';
import { MascotaService } from 'src/app/services/mascota.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mascotas-list',
  templateUrl: './mascotas-list.component.html',
  styleUrls: ['./mascotas-list.component.css'],
  providers: [MascotaService]
})
export class MascotasListComponent implements OnInit {
  cssUrl: string;
  mascotas:any= [];
  Mascota : Mascota[];
  router:Router;
  mascotaModel = new Mascota();
  mascotaModal:any= [];
  loading:boolean=false;
  edit: boolean = false;

  Username : string;

  constructor(public sanitizer: DomSanitizer, private mascotaService: MascotaService, private activateRoute
    : ActivatedRoute) {
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
  }

  ngOnInit(): void {
    this.loadMascotas();
  }

  loadMascotas(): void {
    this.mascotaService.getMascotas().subscribe(
      res=>{
        this.mascotas=res;
        this.loading=true;
        console.log(res)
        console.log(this.mascotas);
      },
      err =>console.error(err)
    )
  }

  DeletePet(id:number):void{
    console.log("ID ELIMINAR:", id)
    Swal.fire({
      title: '¿Estas seguro de eliminar datos de la mascota?',
      text: "!No podra recuperar su datos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!Si, deseo eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mascotaService.deleteMascota(id).subscribe(
          res => {
            console.log("Se elimino el objeto");
            //this.router.navigate['/listado'];
          },
          err =>{
            if(err.status == 200){
              console.log("Se elimino el objeto");
              let index= this.mascotas.map(p =>p.id).indexOf(id)
              this.mascotas.splice(index,1);
            }
          }
        )
        Swal.fire(
          'Eliminado!',
          'Mascota Eliminada!!',
          'success'
        )
      }
    }) 
  }

  MostrarModal(id : string):void{
    
    this.mascotaService.getMascota(id).subscribe(
      res=>{
        console.log(res);
        this.mascotaModal=res;
      },
      err => {throw err}
    )
  }
    
  statusDog(estado:number): boolean{
    if(estado==1){
      return true;
    }
    return false;
  }

}
