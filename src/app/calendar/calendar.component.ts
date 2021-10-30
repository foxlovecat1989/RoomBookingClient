import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/Model/Booking';
import { DataService } from '../data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  selectedDate = new Date();
  date!: string;
  bookings = new Array<Booking>();

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataService.getBookings().subscribe(
      bookings => this.bookings = bookings
    );
  }

  navigateToEditBooking(id: number){
    this.router.navigate(['editBooking'], {queryParams : {id : id}});
  }

  navigateToAddBooking(){
    this.router.navigate(['addBooking']);
  }

}
