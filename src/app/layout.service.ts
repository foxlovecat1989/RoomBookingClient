import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Layout } from 'src/Model/Room';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }

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
