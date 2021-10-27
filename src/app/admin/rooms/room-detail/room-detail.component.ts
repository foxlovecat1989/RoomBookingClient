import { Component, Input, OnInit } from '@angular/core';
import { Layout, LayoutCapacity, Room } from 'src/Model/Room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input()
  room!: Room;

  constructor() { }

  ngOnInit(): void {
  }



}
