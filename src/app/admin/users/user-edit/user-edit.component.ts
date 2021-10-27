import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/Model/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input()
  user!: User;
  message!: string;
  formUser!: User;
  password!: string;

  constructor(
      private dataService: DataService,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.copyUserToAnotherObject();
  }

  private copyUserToAnotherObject() {
    this.formUser = Object.assign({}, this.user);
  }

  submit(){
    if(this.formUser.id!=null)
      this.saveEditUser();
    else
      this.saveAdduser();
  }

  private saveEditUser() {
    this.dataService
      .updateUser(this.formUser)
      .subscribe(
        user => this.router.navigate(['admin', 'users'], { queryParams: { action: 'view', id: user.id } })
      );
  }

  private saveAdduser(){
    this.dataService
      .addUser(this.formUser, this.password)
      .subscribe(
        user => this.router.navigate(['admin', 'users'], { queryParams: { action: 'add'} })
      );
  }
}
