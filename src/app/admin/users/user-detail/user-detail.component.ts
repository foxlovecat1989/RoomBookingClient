import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/Model/User';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input()
  user!: User;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  editUser(){
    this.router.navigate(['admin', 'users'], {queryParams : {id : this.user.id, action : 'edit'}});
  }

}
