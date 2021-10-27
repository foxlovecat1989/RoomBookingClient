import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Room } from 'src/Model/Room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms!: Array<Room>;
  selectedRoom!: Room;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.rooms = this.dataService.getRooms();
  }

  setRoom(id : number){
    this.selectedRoom = this.rooms.find(room => id === room.id)!;
  }

}
