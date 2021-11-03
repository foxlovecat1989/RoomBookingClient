import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { User } from 'src/Model/User';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: Array<User>;
  selectedUser!: User;
  action !: string;
  message = 'Please wait... getting the list of users';
  shouldLoadData = true;

  constructor(
      private dataService: DataService,
      private router: Router,
      private activatedRoute : ActivatedRoute,
      private formResetService : FormResetService
    ) {}

  ngOnInit(): void {
    this.subscribeUsersToLoadData();
  }

  private subscribeRouteParams() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        this.action = params['action'];
        if(id) {
          this.selectedUser = this.users.find(user => user.id === +id)!;
        }
      }
    );
  }

   subscribeUsersToLoadData() {
    this.dataService.getUsers()
      .subscribe(
        users => {
          this.shouldLoadData = false;
          this.users = users;
          this.subscribeRouteParams();
        },
        error => {
          this.message = 'An Error Occurred, please contact support...'
        }

      );
  }

  navigateToViewUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams : {id : id , action : 'view'}});
  }

  navigateToAddUser(){
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], {queryParams : {action : 'add'}});
    this.formResetService.resetUserFormEvent.emit(this.selectedUser);
  }

}
