import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { FormResetService } from 'src/app/form-reset.service';
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

  resetFormEventSubscription!: Subscription;

  roomForm = new FormGroup({
    roomName : new FormControl('roomName'),
    location : new FormControl('location')
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private formResetService : FormResetService
    ) { }

  ngOnInit(): void {
    this.intializeForm();
    this.subscribeResetFormEvent();

  }

  ngOnDestroy(): void{
    this.resetFormEventSubscription.unsubscribe();
  }

  private subscribeResetFormEvent() {
    this.resetFormEventSubscription =
        this.formResetService.resetRoomFormEvent.subscribe(
          room => {
            this.room = room;
            this.intializeForm();
          }
        );
  }

  private intializeForm() {
    this.roomForm = this.formBuilder.group({
      roomName: [this.room.name, Validators.required],
      location: [this.room.location, [Validators.required, Validators.min(2)]]
    });

    for (const layout of this.layouts) {
      const layoutCapacity = this.room.layoutCapacities.find(
        lc => {
          if (this.isValidKey(layout, Layout))
            return lc.layout === Layout[layout];
          return false;
        }
      );
      const initialCapacity = (layoutCapacity == null) ? 0 : layoutCapacity.capacity;
      this.roomForm.addControl(`layout${layout}`, this.formBuilder.control(initialCapacity));
    }
  }

  onSubmit(){
      this.getValueFromInputField();
      this.saveData();
  }

  private saveData() {
    if (this.room.id == null) { // under the adding mode
      this.dataService.addRoom(this.room).subscribe(next => {
        this.router.navigate(['admin', 'rooms'], { queryParams: { action: 'view', id: next.id } });
      });
    } else { // under the editing mode
      this.dataService.updateRoom(this.room).subscribe(next => {
        this.router.navigate(['admin', 'rooms'], { queryParams: { action: 'view', id: next.id } });
      });
    }
  }

  private getValueFromInputField() {
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.controls['location'].value;
    this.room.layoutCapacities = new Array<LayoutCapacity>();
    for (const layout of this.layouts) {
      const layoutCapacity = new LayoutCapacity();
      if (this.isValidKey(layout, Layout))
        layoutCapacity.layout = Layout[layout];
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.layoutCapacities.push(layoutCapacity);
    }
  }

  private isValidKey(key: string, obj: {[propName: string]: any}) : key is keyof object {
    return key in obj;
  }
}
