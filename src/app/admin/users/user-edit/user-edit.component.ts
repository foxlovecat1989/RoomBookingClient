import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
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
  password2!: string;
  nameIsValid = false;
  passwordsAreValid = false;
  passwordsMatch = false;
  userResetEventSubscription!: Subscription;

  constructor(
      private dataService: DataService,
      private router: Router,
      private formResetService : FormResetService
    ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.userResetEventSubscription =
      this.formResetService.resetUserFormEvent.subscribe(
          user => {
            this.user = user;
            this.initializeForm();
          }
      );
  }

  ngOnDestroy(): void{
    this.userResetEventSubscription.unsubscribe();
  }

  private initializeForm() {
    this.copyUserToAnotherObject();
    this.checkNameIsValid();
    this.checkPasswordsAreValid();
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

  checkNameIsValid(){
    if(this.formUser.name)  // editing a user
      this.nameIsValid = this.formUser.name.trim().length > 0;
    else                    // adding a user
      this.nameIsValid = false;
  }

  checkPasswordsAreValid(){
    if(this.formUser.id!=null){   // editing a user
      this.passwordsAreValid = true;
      this.passwordsMatch = true;
    }
    else {                        // adding a user
      this.passwordsMatch = this.password === this.password2;
      if(this.password != null){
        this.passwordsAreValid = this.password.trim().length > 0;
      }
    }
  }
}
