import { DataService } from "src/app/data.service";

export class Room {

  id!: number;
  name !: string;
  location! : string;
  layoutCapacities = new Array<LayoutCapacity>();

  static fromHttp(room : Room) {
    const newRoom = new Room();
    newRoom.id = room.id;
    newRoom.name = room.name;
    newRoom.location = room.location;
    newRoom.layoutCapacities = new Array<LayoutCapacity>();
    for(const lc of room.layoutCapacities)
      newRoom.layoutCapacities.push(LayoutCapacity.fromHttp(lc));

    return newRoom;
  }
}

export class LayoutCapacity {
  layout !: Layout;
  capacity !: number;

  static fromHttp(lc: LayoutCapacity){
    const newLc = new LayoutCapacity();
    newLc.capacity = lc.capacity;
    newLc.layout = lc.layout;  // Layout[lc.layout]
    // const keysOfLayout = Object.keys(Layout);
    // for(const key of keysOfLayout){
    //   if(LayoutCapacity.isValidKey(key, Layout))
    //     if(Layout[key]==lc.layout)
    //       newLc.layout = Layout[key];
    //
    
    return newLc;
  }

  // private static isValidKey(key: string, obj: {[propName: string]: any}) : key is keyof object {
  //   return key in obj;
  // }
}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-Shape',
  BOARD = 'Board Meeting'
}


