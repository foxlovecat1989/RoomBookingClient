import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TYPED_NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from 'src/Model/Booking';
import { Layout, LayoutCapacity, Room } from 'src/Model/Room';
import { User } from 'src/Model/User';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms!: Array<Room>;
  private users!: Array<User>;
  private bookings!: Array<Booking>;

  constructor(private http : HttpClient) {
    console.log(environment.restURL);
  }

  // getUserById(id: number) : Observable<User> {
  //   return this.http.get<User>(environment.restURL + '/api/users/' + id)
  //     .pipe(
  //       map( data => User.fromHttp(data))
  //     );
  // }

  getUsers() : Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.restURL + '/api/users')
     .pipe(
       map(
         data => {
           const users = new Array<User>();
           for(const user of data)
              users.push(User.fromHttp(user));

            return users;
         }
       )
     );

  }

  getRooms() : Observable<Array<Room>> {
    return this.http.get<Array<Room>>(environment.restURL + '/api/rooms')
      .pipe(
        map( data => {
          const rooms = new Array<Room>();
          for (const room of data) {
            rooms.push(Room.fromHttp(room));
          }
          return rooms;
        })
      );
  }

  updateUser(user: User) : Observable<User> {
    return this.http.put<User>(environment.restURL + '/api/users', user);
  }

  addUser(newUser : User, password : string) : Observable<User>{
    const fullUser = {id : newUser.id, name : newUser.name, password : password };
    return this.http.post<User>(environment.restURL + '/api/users', fullUser);
  }

  addRoom(newRoom : Room) : Observable<any>{
    return this.http.post<Room>(environment.restURL + '/api/rooms', this.getCorrectedRoom(newRoom));
  }


  updateRoom(room: Room) : Observable<Room>{
    return this.http.put<Room>(environment.restURL + '/api/rooms', this.getCorrectedRoom(room));
  }

  private getCorrectedRoom(room : Room) {
    const correctedRoom : {'id': number, 'name': string, 'location': string, layoutCapacities : Array<LayoutCapacity>}
      = {id: room.id, name: room.name, location: room.location, layoutCapacities : []};
    for (const lc of room.layoutCapacities) {

      let correctLayout : Layout = Layout.THEATER;
      for (let member in Layout) {
        if(this.isValidKey(member, Layout))
          if (Layout[member] === lc.layout) {
            correctLayout = member;
          }
      }

      const correctedLayout : {'layout': Layout, 'capacity': number}
          = {layout : correctLayout, capacity: lc.capacity};
      correctedRoom.layoutCapacities.push(correctedLayout);
    }
    return correctedRoom;
  }

  deleteRoom(id: number) : Observable<any>{
    return of(null);
  }

  deleteUser(id: number) : Observable<any>{
    return of(null);
  }

  resetUserPassword(id: number) : Observable<any>{
    return of(null);
  }

  getBookings(date: string) : Observable<any>{
    return of(null);
  }

  getBooking(id: number) : Observable<any>{
    return of(null);
  }

  saveBooking(booking: Booking) : Observable<any> {
    return of(null);
  }

  addBooking(newBooking: Booking) : Observable<any>{
    return of(null);
  }

  deleteBooking(id : number) : Observable<any>{
    return of(null);
  }

  getValuesOfLayoutEnum(): Observable<Array<string>>{
    const keysOfLayouts = Object.keys(Layout);
    const valuesOfLayouts = new Array<string>();
    for(const key of keysOfLayouts){
      if(this.isValidKey(key, Layout))
      valuesOfLayouts.push(Layout[key]);
    }

    return of(valuesOfLayouts);
  }

  private isValidKey(key: string, obj: {[propName: string]: any}) : key is keyof object {
    return key in obj;
  }

}
