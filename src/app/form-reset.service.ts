import { EventEmitter, Injectable } from '@angular/core';
import { Room } from 'src/Model/Room';
import { User } from 'src/Model/User';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {
  resetRoomFormEvent = new EventEmitter<Room>();
  resetUserFormEvent = new EventEmitter<User>();
  constructor() { }
}
