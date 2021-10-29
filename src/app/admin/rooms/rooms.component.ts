import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
import { Room } from 'src/Model/Room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms!: Array<Room>;
  selectedRoom!: Room;
  action!: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formResetService : FormResetService
  ) { }

  ngOnInit(): void {
    this.subscribeRooms();
    this.subscribeRouteParams();
  }

  private subscribeRouteParams() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        const id = params['id'];
        this.action = params['action'];
        if (id)                     // under the editing mode
          this.selectedRoom = this.rooms.find(room => room.id === +id)!;
        if(this.action === 'add'){  // under the editing mode
          this.selectedRoom = new Room();
          this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
        }
      }
    );
  }

  private subscribeRooms() {
    this.dataService.getRooms().subscribe(rooms => this.rooms = rooms);
  }

  navigateToViewRoom(id: number){
    this.router.navigate(['admin', 'rooms'], {queryParams : {id : id, action : 'view'}});
  }

  navigateToAddRoom(){
    this.router.navigate(['admin', 'rooms'], {queryParams : {action : 'add'}});
  }

}
