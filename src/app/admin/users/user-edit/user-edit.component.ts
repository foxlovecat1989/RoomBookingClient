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
    this.dataService
      .updateUser(this.formUser)
      .subscribe(
        user =>
          this.router.navigate(['admin', 'users'], {queryParams : {action : 'view', id : this.user.id}})
      );
  }
}
