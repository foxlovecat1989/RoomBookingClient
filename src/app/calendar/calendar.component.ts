import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getBookings().subscribe(
      bookings => this.bookings = bookings
    );
  }

}
