import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/Model/User';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: Array<User>;
  selectedUser!: User;

  constructor(
      private dataService: DataService,
      private router: Router,
      private activatedRoute : ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.subscribeUsers();
    this.subscribeRouteParams();
  }
  private subscribeRouteParams() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        this.selectedUser = this.users.find(user => user.id === +id)!;
      }
    );
  }

  private subscribeUsers() {
    this.dataService.getUsers().subscribe(users => this.users = users);
  }

  navigateToUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams : {id : id }});
  }

}
