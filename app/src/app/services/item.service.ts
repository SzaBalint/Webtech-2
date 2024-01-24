import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private BASE_URL = environment.API_URL;
  private headers=new HttpHeaders().append('Content-Type','application/json');
  private _refreshNeeded = new Subject<void>();
  private itemId: string = "";

  constructor(private http: HttpClient) { }

  get refreshNeeded(){
    return this._refreshNeeded;
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.BASE_URL}/items`)
  }

  getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.BASE_URL}/items/${id}`)
  }

  createItem(name: string, quantity: number, price: number, category: string): Observable<Item> {
    return this.http.post<Item>(`${this.BASE_URL}/items`,
    { name, quantity, price, category })
    .pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/items/${id}`)
    .pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }

  updateItem(id: string,item: Item): Observable<any> {
    return this.http.patch(`${this.BASE_URL}/items/${id}`,item)
    .pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }

  getItemUpdate(): string{
    return this.itemId;
  }

  populateForm(itemupdate:any){

    this.itemId = itemupdate;
    console.log(itemupdate);
  }
}
