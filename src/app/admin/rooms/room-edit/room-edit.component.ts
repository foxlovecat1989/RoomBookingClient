import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/Model/Room';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  @Input()
  room!: Room;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  
}
