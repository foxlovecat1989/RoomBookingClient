import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Layout, LayoutCapacity, Room } from 'src/Model/Room';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  @Input()
  room!: Room;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToEditRoom(id: number){
    this.router.navigate(['admin', 'rooms'], {queryParams : {id : id, action : 'edit'}});
  }

}
