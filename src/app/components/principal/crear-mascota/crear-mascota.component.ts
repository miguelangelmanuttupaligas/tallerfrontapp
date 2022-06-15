import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Mascota } from 'src/app/models/mascota';
import { MascotaService } from 'src/app/services/mascota.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css'],
  providers: [MascotaService]
})
export class CrearMascotaComponent implements OnInit {
  cssUrl : string;

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    especie: new FormControl('', [Validators.required]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    sexo: new FormControl('', [Validators.required]),
    estado: new FormControl(1, [Validators.required]),
    imagen: new FormControl('', [Validators.required])
  });
  
  constructor(public sanitizer: DomSanitizer, private mascotaService: MascotaService) {
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
   }

  ngOnInit(): void {
  }
  
  async savePets(){

    this.mascotaService.saveMascotas(this.form.value).subscribe(
      res=>{
        console.log("Se registro: ",res);
        Swal.fire({
          icon: 'success',
          title: 'Mascota registrada',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err =>console.error(err + "AQUI")
    )
    console.log(this.form.value);
  }
}
