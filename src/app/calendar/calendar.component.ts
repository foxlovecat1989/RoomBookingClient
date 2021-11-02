import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/Model/Booking';
import { User } from 'src/Model/User';
import { DataService } from '../data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  selectedDate!: string;
  bookings = new Array<Booking>();

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscribeToBookings();
    this.subscribeOnDateChange();
  }

  private subscribeOnDateChange() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.selectedDate = params['selectedDate'];
        if(!this.selectedDate)
          this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
        this.dataService.getBookings(this.selectedDate).subscribe(next => this.bookings = next);
      }
    );
  }

  private subscribeToBookings() {
    this.dataService.getBookings(this.selectedDate).subscribe(
      bookings => this.bookings = bookings
    );
  }

  navigateToEditBooking(id: number){
    this.router.navigate(['editBooking'], {queryParams : {id : id}});
  }

  navigateToAddBooking(){
    this.router.navigate(['addBooking']);
  }

  navigateToDeleteBooking(id: number){
    this.dataService.deleteBooking(id).subscribe();
  }

  onDateChanged(){
    this.router.navigate([''], {queryParams: {selectedDate: this.selectedDate}});
  }

}
