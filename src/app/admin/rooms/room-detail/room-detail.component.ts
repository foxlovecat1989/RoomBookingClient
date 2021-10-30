import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Layout, LayoutCapacity, Room } from 'src/Model/Room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input()
  room!: Room;

  constructor(
    private router: Router,
    private dataService : DataService
    ) { }

  ngOnInit(): void {
  }

  navigateToEditRoom(id: number){
    this.router.navigate(['admin', 'rooms'], {queryParams : {id : id, action : 'edit'}});
  }

  deleteRoom(){
    this.dataService.deleteRoom(this.room.id).subscribe(next => this.router.navigate(['admin', 'rooms']));
  }

}
