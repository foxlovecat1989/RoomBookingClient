import { EventEmitter, Injectable } from '@angular/core';
import { Room } from 'src/Model/Room';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {
  resetRoomFormEvent = new EventEmitter<Room>();
  constructor() { }
}
