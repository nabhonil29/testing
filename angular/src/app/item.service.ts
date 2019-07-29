import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IItem } from './item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private _url: string = "http://localhost:3000/items";

  constructor(private http : HttpClient) { }

  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this._url);
  }
}
