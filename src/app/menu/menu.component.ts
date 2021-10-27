import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToAdminUsers(){
    this.router.navigate(['admin', 'users']);
    console.log('users');
  }

  navigateToAdminRooms(){
    this.router.navigate(['admin', 'rooms']);
    console.log('rooms');
  }

  navigateToHome(){
    this.router.navigate(['']);
    console.log('home');
  }

}
