import { APP_INITIALIZER, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { LayoutService } from 'src/app/layout.service';
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
    private layoutService : LayoutService
  ) { }

  ngOnInit(): void {
      this.getExistRooms();
      this.getExistUsers();
      this.getValuesOfLayoutEnum();
      this.subscribeToBooking();
  }


  private getValuesOfLayoutEnum() {
    this.layoutService.getValuesOfLayoutEnum().subscribe(next => this.valuesOfLayoutEnum = next);
  }

  private subscribeToBooking() {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = params['id'];
      if (id)
        this.dataService.getBooking(+id).subscribe(next => this.booking = next);
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
