import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Room, Layout, LayoutCapacity } from 'src/Model/Room';
@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})

export class RoomEditComponent implements OnInit {
  @Input()
  room!: Room;
  layoutEnum!: Layout;
  layouts = Object.keys(Layout);
  labelOfLayout!: string[];
  roomForm = new FormGroup({
    roomName : new FormControl('roomName'),
    location : new FormControl('location')
  });

  constructor() { }

  ngOnInit(): void {
    this.roomForm.patchValue({
      roomName : this.room.name,
      location : this.room.location
    });
    for(const layout of this.layouts){
      this.roomForm.addControl(`layout${layout}`, new FormControl(`layout${layout}`));
    }
  }

  onSubmit(){
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.controls['location'].value;
    this.room.layoutCapacities = new Array<LayoutCapacity>();
    for (const layout of this.layouts) {
      const layoutCapacity = new LayoutCapacity();
      if(this.isValidKey(layout, Layout))
        layoutCapacity.layout = Layout[layout];
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.layoutCapacities.push(layoutCapacity);
    }
    console.log(this.room);
    // call a method to the dataService to save room
  }

  isValidKey(key: string, obj: {[propName: string]: any}) : key is keyof object {
    return key in obj;
  }
}
