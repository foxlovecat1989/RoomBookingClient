import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.rooms = this.dataService.getRooms();
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id']
        if(id)
          this.selectedRoom = this.rooms.find(room => room.id === +id)!;
      }
    );
  }

  navigateToRoom(id: number){
    this.router.navigate(['admin', 'rooms'], {queryParams: {id: id}});
  }

}
