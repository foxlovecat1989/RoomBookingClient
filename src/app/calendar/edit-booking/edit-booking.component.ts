import { APP_INITIALIZER, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Booking } from 'src/Model/Booking';
import { Layout, Room } from 'src/Model/Room';
import { User } from 'src/Model/User';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  booking!: Booking;
  rooms!: Array<Room>;
  layouts = Object.keys(Layout);
  valuesOfLayoutEnum!: Array<string>;
  users!: Array<User>;

  constructor(
    private dataService: DataService,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
      this.getExistRooms();
      this.getExistUsers();
      this.getValuesOfLayoutEnum();
      this.subscribeToBooking();
  }

  onSubmit(){
    if(this.booking.id)  // under editing mode
      this.saveEditBooking();
    else                 // under adding mode
      this.saveAddBooking();
  }


  private saveAddBooking() {
    this.dataService.addBooking(this.booking).subscribe(
      next => {
        this.booking = next;
        this.router.navigate(['']);
      }
    );
  }

  private saveEditBooking() {
    this.dataService.saveBooking(this.booking).subscribe(
      next => {
        this.booking = next;
        this.router.navigate(['']);
      }
    );
  }

  private getValuesOfLayoutEnum() {
    this.dataService.getValuesOfLayoutEnum().subscribe(next => this.valuesOfLayoutEnum = next);
  }

  private subscribeToBooking() {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      if (id)       // under editing mode
        this.dataService.getBooking(+id).subscribe(next => this.booking = next);
      else          // under adding mode
        this.booking = new Booking();
    });
  }

  private getExistUsers() {
    this.dataService.getUsers().subscribe(
      next => this.users = next
    );
  }

  private getExistRooms() {
    this.dataService.getRooms().subscribe(
      next => this.rooms = next
    );
  }


}
