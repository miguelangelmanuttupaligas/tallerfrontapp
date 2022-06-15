import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/models/mascota';
import { Solicitud } from 'src/app/models/solicitud';
import { MascotaService } from 'src/app/services/mascota.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  
  solicitudes :any = [];
  loading:boolean=false;
  mascotaModal:any= [];

  constructor( private solicitudService:SolicitudService, private mascotaService: MascotaService) { }
  
  objMascota:Mascota={
    id:null,
    nombre:'',
    especie:'',
    fechaNacimiento:'',
    sexo: '',
    estado: null,
    imagen: '',
  }

  objSolicitud:Solicitud ={
    id:0,
    idMascota: 0,
    idUsuario: 0,
    estado:0,
    mensaje: '',
  }

  ngOnInit(): void {
    this.loadSolicitudes();
  }

  loadSolicitudes():void {

    this.solicitudService.getSolicitudes().subscribe(res=>{

      this.solicitudes = res;
      this.loading=true;
      console.log(this.solicitudes);

    },
    err => console.error(err))
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

  statusRechazado(solicitud: Solicitud): void{
    const {id,idMascota} =solicitud;
    let idm= idMascota.toString();
    this.getMascotaR(idm);
    this.updatecamposSolicitud(1,solicitud);
    this.updateSolicitud();
    this.eliminarSolicitud(id);
  }
  statusAprobado(solicitud: Solicitud): void{
    const {idMascota} =solicitud;
    let id= idMascota.toString();
    this.getMascotaA(id);
    this.updatecamposSolicitud(3,solicitud);
    this.updateSolicitud();
  }

  cambiarEstadoM(estado:number):void{
    this.objMascota.id=this.mascotaModal.id,
    this.objMascota.nombre=this.mascotaModal.nombre,
    this.objMascota.especie=this.mascotaModal.especie,
    this.objMascota.fechaNacimiento=this.mascotaModal.fechaNacimiento,
    this.objMascota.sexo= this.mascotaModal.sexo,
    this.objMascota.imagen= this.mascotaModal.imagen,
    this.objMascota.estado=estado;
    this.mascotaModal.estado=estado;
  }

  getMascotaR(id: string):void{
    this.mascotaService.getMascota(id).subscribe(
      res=>{
        this.mascotaModal=res;
        this.cambiarEstadoM(1);
        this.updateMascota();
        Swal.fire({
          icon: 'success',
          title: 'Solicitud Rechazada',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err => {throw err}
    )
  }

  getMascotaA(id: string):void{
    this.mascotaService.getMascota(id).subscribe(
      res=>{
        this.mascotaModal=res;
        this.cambiarEstadoM(3);
        this.updateMascota();
        Swal.fire({
          icon: 'success',
          title: 'Solicitud Aceptada',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err => {throw err}
    )
  }


  updateMascota():void{
    this.mascotaService.updateMascota(this.objMascota).subscribe(
      res=>{
        console.log("Se editara: ",res);
      },
      err =>console.error(err)
    )
    console.log(this.objMascota);
  }
  
  eliminarSolicitud(id:number):void{
    /*var indice = this.solicitudes.indexOf( this.solicitudes[id]); // obtenemos el indice*/
    console.log("INDICE: ",id);
    let index= this.solicitudes.map(p =>p.id).indexOf(id)
    this.solicitudes.splice(index,1);
    
    this.solicitudService.deleteSolicitud(id).subscribe(
      res=> console.log(res),
      err=>console.log(err)
    )
  }

  updateSolicitud():void{
    console.log("AQUI19",this.objSolicitud)
    this.solicitudService.solicitarAdopcion(this.objSolicitud).subscribe(
      res=>{
        console.log("registro solicitud: ",res);
        this.loadSolicitudes();
      },
      err =>console.error(err)
    );
  }

  updatecamposSolicitud(estado: number,solicitud: Solicitud):void{
    this.objSolicitud.id=solicitud.id;
    this.objSolicitud.idMascota=solicitud.idMascota;
    this.objSolicitud.idUsuario=solicitud.idUsuario;
    this.objSolicitud.estado=estado;
    this.objSolicitud.mensaje=solicitud.mensaje;
  }

}
