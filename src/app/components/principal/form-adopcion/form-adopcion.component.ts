import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Mascota } from 'src/app/models/mascota';
import { MascotaService } from 'src/app/services/mascota.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Adopcion } from 'src/app/models/adopcion';
import { ApiService } from 'src/app/services/api.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-form-adopcion',
  templateUrl: './form-adopcion.component.html',
  styleUrls: ['./form-adopcion.component.css']
})
export class FormAdopcionComponent implements OnInit {
  cssUrl: string;
  mascotaModal:any= [];
  currentUser: any = {};
  loading:boolean=false;
  objAdop:any ={
    apellidos:'',
    email: '',
    numero: '',
    direccion: '',
    mensaje: '',
  }

  objSolicitar:Solicitud ={
    idMascota: 0,
    idUsuario: 0,
    estado:0,
    mensaje: '',
  }

  objForm:Adopcion ={
    tema:'',
    email: '',
    mensaje: '',
  }

  objMascota:Mascota={
    id:null,
    nombre:'',
    especie:'',
    fechaNacimiento:'',
    sexo: '',
    estado: null,
    imagen: '',
  }
  //const { id, dni, nombres, correo, fecCreacion, tipo } = this.currentUser;

  constructor(public sanitizer: DomSanitizer, private serviEmail: ApiService, private mascotaService: MascotaService, private activateRoute: ActivatedRoute, private router:Router, private solicitudService: SolicitudService) {
      this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));

    const {apellidos, direccion, email,id}=this.currentUser;
    this.objAdop.apellidos=apellidos;
    this.objAdop.email=email;
    this.objAdop.direccion=direccion;
    
    const params= this.activateRoute.snapshot.params;

    this.objSolicitar.idMascota=params.id;
    this.objSolicitar.idUsuario=id;
    
    console.log(params.id)
    if(params.id){

      this.mascotaService.getMascota(params.id).subscribe(
        res=>{
          console.log(res);
          this.loading=true;
          this.mascotaModal=res;
        },
        err => {throw err}
      )
    }
    console.log("usuario adopcion: ", this.currentUser);
  }
  /*
  form: FormGroup = new FormGroup({
    //name: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    //email: new FormControl('', [Validators.required]),
    tef: new FormControl('', [Validators.required]),
    //dir: new FormControl(1, [Validators.required]),
    msj: new FormControl('', [Validators.required])
  });*/

  statusDog(estado: number): boolean{
    if(estado == 1){
      return true
    }
    return false;
  }
  saveAdoption():void{
    this.objForm.tema='Solicitud de Adopción de mascota';
    this.objForm.email=this.objAdop.email;//this.objAdop.email
    this.objForm.mensaje=`
    - Interesado: ${this.objAdop.apellidos} - ${this.objAdop.email}
    - Teléfono: +51 ${this.objAdop.numero}
    - Dirección:${this.objAdop.direccion}
    - Por la mascota: ${this.mascotaModal.nombre}
    -----------------------------------------------------------------
     ${this.objAdop.mensaje}`;
     
     this.objSolicitar.mensaje=this.objAdop.mensaje;
     this.objSolicitar.estado=2;
     console.log(" ENVIADO",this.objMascota)
     Swal.fire({
      title: '¿Estas seguro de enviar el formulario?',
      text: "Se mantendra en contacto en las proximas horas",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!Si, deseo adoptar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviEmail.enviarMensaje(this.objForm).subscribe(
          res=>{},
          err=>{
            if(err==200){
              console.log(" ENVIADO")
              //this.router.navigate['/principal/listado'];
            }
          }
        )
        Swal.fire(
          'Excelente',
          'Enviado exitosamente!!',
          'success'
        )
        //ACTUALIZAR ESTADO DE MASCOTA
        this.cambiarEstadoM(2);
        this.enviarSolicitud();
        this.updateMascota();
        this.router.navigate['/principal/listado'];
      }
    }) 
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

  updateMascota():void{
    this.mascotaService.updateMascota(this.objMascota).subscribe(
      res=>{
        console.log("Se editara: ",res);
        this.router.navigate['/principal/listado'];
      },
      err =>console.error(err)
    )
    console.log(this.objMascota);
  }
  
  enviarSolicitud():void{
    console.log("AQUI200",this.objSolicitar)
    
    this.solicitudService.solicitarAdopcion(this.objSolicitar).subscribe(
      res=>{
        console.log("registro solicitud: ",res);
      },
      err =>console.error(err)
    );

  }
}
