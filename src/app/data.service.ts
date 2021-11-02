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

  updateUser(user: User) : Observable<any> {
    return this.http.put<User>(environment.restURL + '/api/users', user);
  }

  addRoom(newRoom : Room) : Observable<any>{
    return of(null);
  }


  updateRoom(room: Room) : Observable<any>{
    return of(null);
  }

  deleteRoom(id: number) : Observable<any>{
    return of(null);
  }

  addUser(newUser : User, password : string) : Observable<any>{
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
