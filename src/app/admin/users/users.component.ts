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

  constructor(
      private dataService: DataService,
      private router: Router,
      private activatedRoute : ActivatedRoute,
      private formResetService : FormResetService
    ) {}

  ngOnInit(): void {
    this.subscribeUsers();
    this.subscribeRouteParams();
  }
  private subscribeRouteParams() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        this.action = params['action'];
        if(id)                        // under the editing mode
          this.selectedUser = this.users.find(user => user.id === +id)!;
        if(this.action === 'add'){    // under the adding mode
          this.selectedUser = new User();
          this.action = 'edit';
          this.formResetService.resetUserFormEvent.emit(this.selectedUser);
        }
      }
    );
  }

  private subscribeUsers() {
    this.dataService.getUsers().subscribe(users => this.users = users);
  }

  navigateToViewUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams : {id : id , action : 'view'}});
  }

  navigateToAddUser(){
    this.router.navigate(['admin', 'users'], {queryParams : {action : 'add'}});
  }

}
