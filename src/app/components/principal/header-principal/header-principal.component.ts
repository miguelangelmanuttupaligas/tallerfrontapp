import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-principal',
  templateUrl: './header-principal.component.html',
  styleUrls: ['./header-principal.component.css']
})
export class HeaderPrincipalComponent implements OnInit {
  nombre: string = '';
  currentUser: any = {};
  constructor(private activateRoute: ActivatedRoute, private serviLogin: ApiService, private route : Router) { }
  @Input() Username : string;

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser)
  }

  /*
  async logout() {
    const { id, dni, nombres, correo, fecCreacion, tipo } = this.currentUser;
    console.log(this.currentUser);
      const user = {
        dni,
        nombres,
        correo,
        fecCreacion,
        estado: false,
        tipo
      };
      localStorage.setItem('user', null);
    //this.serviLogin.logout().then(() => this.router.navigate(["/login"]));
  }*/

  logout() {
    localStorage.setItem('user', null);
    this.route.navigate(["/login"]);
  }

}
