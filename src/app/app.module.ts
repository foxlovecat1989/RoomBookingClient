import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UsersComponent } from './admin/users/users.component';
import { RoomsComponent } from './admin/rooms/rooms.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CalendarComponent,
    UsersComponent,
    RoomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
