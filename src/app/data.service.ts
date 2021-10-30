import { formatDate } from '@angular/common';
import { TYPED_NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from 'src/Model/Booking';
import { Layout, LayoutCapacity, Room } from 'src/Model/Room';
import { User } from 'src/Model/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms!: Array<Room>;
  private users!: Array<User>;
  private bookings!: Array<Booking>;

  constructor() {
  }

  private isValidKey(key: string, obj: {[propName: string]: any}) : key is keyof object {
    return key in obj;
  }

  getRooms() : Observable<any>{
    return of(null);
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

  getUsers() : Observable<any> {
    return of(null);
  }

  updateUser(user: User) : Observable<any> {
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

}
