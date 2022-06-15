import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroI } from 'src/app/models/registro.interface';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  registroForm = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    apellidos : new FormControl('',Validators.required),
    direccion : new FormControl('',Validators.required),
    rol : new FormControl(''),
  })

  
  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    let rol = "USER";
    this.registroForm.patchValue({
      'rol': rol
    })
  }

  onRegistro(form:RegistroI){
      console.log(form);
      this.api.registroUser(form).subscribe(data =>{

        console.log(data); 
        if(data != null){
          //localStorage.setItem("token", dataResponse.result.token);
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
              this.router.navigate(["/login"])
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Verifique si completo los campos correctamente',
            timer: 3000
          });
        }
      })
      
  }

}
