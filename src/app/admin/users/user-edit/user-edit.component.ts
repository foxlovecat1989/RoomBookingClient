import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output()
  dataChangedEvent = new EventEmitter();

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
    this.subscribeUserResetEvent();
  }

  ngOnDestroy(): void{
    this.userResetEventSubscription.unsubscribe();
  }

  private subscribeUserResetEvent() {
    this.userResetEventSubscription =
      this.formResetService.resetUserFormEvent.subscribe(
        user => {
          this.user = user;
          this.initializeForm();
        }
      );
  }

  onSubmit(){
    this.message = 'Saving...'
    // console.log(this.formUser.id);
    if(this.formUser.id == null){
      this.saveAddUser();
    } else{
      this.saveEditUser();
    }
  }

  private initializeForm() {
    this.copyUserToAnotherObject();
    this.checkNameIsValid();
    this.checkPasswordsAreValid();
  }

  private copyUserToAnotherObject() {
    this.formUser = Object.assign({}, this.user);
  }

  private saveEditUser() {
    this.dataService
      .updateUser(this.formUser)
      .subscribe(
        user => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'users'], { queryParams: { action: 'view', id: user.id } });
        },
        error => {
          this.message = 'Something went wrong, data wasn\'t saved. You may want to try again...';
        }
      );
  }

  private saveAddUser(){
    this.dataService
      .addUser(this.formUser, this.password)
      .subscribe(
        user => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'users'], { queryParams: { action: 'view', id: user.id } });
        },
        error => {
          this.message = 'Something went wrong, data wasn\'t saved. You may want to try again...';
        }
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
