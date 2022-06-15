import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {FormGroup, FormControl, Validators} from '@angular/forms'
import { ApiService } from '../../services/api.service'
import { LoginI } from 'src/app/models/login.interface';

import { Router, ActivatedRoute } from '@angular/router';
import { ResponseI } from 'src/app/models/response.interface';
import { User } from 'src/app/models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username : new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })
  
  idUser= '';
  loading:boolean=false;
  constructor( private api:ApiService, private router:Router, private route: ActivatedRoute){

  }
  
  errorStatus:boolean = false;
  errorMsj : any = "";

  ngOnInit(): void {
    
  }

  onLogin(form:LoginI){

    console.log(form);
    this.api.loginByEmail(form).subscribe(data =>{
      console.log("data",data);
      localStorage.setItem('user', JSON.stringify(data));
      let dataResponse:User = data;
      const userP = {
        id: dataResponse.id,
        username: dataResponse.username,
        apellidos: dataResponse.apellidos,
        email: dataResponse.email,
        password: dataResponse.password,
        direccion: dataResponse.direccion,
        rol: dataResponse.rol
      };
      this.idUser = dataResponse.username;
      
      if(dataResponse != null){
        this.errorStatus=false;
        //localStorage.setItem("token", dataResponse.result.token);
        this.loading=true;
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            if(dataResponse.rol == 'ADMIN') this.router.navigate(["/interfaz-admin"])
            else this.router.navigate(["/principal"])
          })
      }
    },
    err=> {
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio',
        timer: 3000
      });
      this.loading=true;
      this.errorStatus=true;
    })
  }
}
