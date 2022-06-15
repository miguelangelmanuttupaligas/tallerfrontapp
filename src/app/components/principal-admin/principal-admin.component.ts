import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-principal-admin',
  templateUrl: './principal-admin.component.html',
  styleUrls: ['./principal-admin.component.css']
})
export class PrincipalAdminComponent implements OnInit {
  setting: boolean = false;
  cssUrl: string;
  currentUser : any = {};
  router: any;
  constructor(public sanitizer: DomSanitizer, private route : Router) { 
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentUser)
  }
  logout() {
    localStorage.setItem('user', null);
    this.route.navigate(["/login"]);
  }
  showUserProfile(): void {
    this.setting = !this.setting;
  }

}
