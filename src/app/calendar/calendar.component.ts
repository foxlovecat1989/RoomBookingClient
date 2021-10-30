import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  selectedDate = new Date();
  date!: string;

  constructor() { }

  ngOnInit(): void {
    this.date = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US');
  }

}
