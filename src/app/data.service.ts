import { Injectable } from '@angular/core';
import { Layout, LayoutCapacity, Room } from 'src/Model/Room';
import { User } from 'src/Model/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms = new Array<Room>();
  private users = new Array<User>();

  constructor() {
    this.initialState();
  }

  private initialState() {
    this.generateDummyRooms();
    this.generatedummyUsers();
  }

  private generateDummyRooms() {
    this.rooms = new Array<Room>();
    const room1 = new Room();
    room1.id = 1;
    room1.name = 'First Room';
    room1.location = 'First Floor';
    const capacity1 = new LayoutCapacity();
    capacity1.layout = Layout.THEATER;
    capacity1.capacity = 50;
    const capacity2 = new LayoutCapacity();
    capacity2.layout = Layout.USHAPE;
    capacity2.capacity = 20;
    room1.layoutCapacities.push(capacity1);
    room1.layoutCapacities.push(capacity2);

    const room2 = new Room();
    room2.id = 2;
    room2.name = 'Second Room';
    room2.location = 'Third Floor';
    const capacity3 = new LayoutCapacity();
    capacity3.layout = Layout.THEATER;
    capacity3.capacity = 60;
    room2.layoutCapacities.push(capacity3);

    this.rooms.push(room1);
    this.rooms.push(room2);
  }

  private generatedummyUsers() {
    this.users = new Array<User>();
    const user1 = new User();
    user1.id = 1;
    user1.name = 'Matt';
    const user2 = new User();
    user2.id = 2;
    user2.name = 'Diana';
    const user3 = new User();
    user3.id = 3;
    user3.name = 'Suzanne';
    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);
  }

  getRooms() : Array<Room>{
    return this.rooms;
  }

  getUsers() : Array<User> {
    return this.users;
  }
}
