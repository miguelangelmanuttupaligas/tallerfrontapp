import { Component, OnInit } from '@angular/core';
import { MascotaService } from 'src/app/services/mascota.service';
import { Mascota } from 'src/app/models/mascota';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perros-admin',
  templateUrl: './perros-admin.component.html',
  styleUrls: ['./perros-admin.component.css']
})
export class PerrosAdminComponent implements OnInit {
  mascotas:any= [];
  loading:boolean=false;
  edit: boolean = false;

  constructor(private mascotaService: MascotaService) { }

  
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


}
