import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  private BASE_URL = environment.API_URL;
  private headers=new HttpHeaders().append('Content-Type','application/json');
  private _refreshNeeded = new Subject<void>();
  private itemId: string = "";

  constructor(private http: HttpClient) { }

  /*authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/items/authenticate', user,{headers: headers})
    .pipe(map((res:any) => res.json));
  }*/

  login(data:any) {
    // return this.http
    //   .post(`${this.BASE_URL}/users/login`, {
    //     email,
    //     password,
    //   });
    return this.http.post<any>(`${environment.API_URL}/users/login`,JSON.stringify(data),{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    });
  }

  authenticateUser(user:any) {
    let headers = new HttpHeaders();
    headers.append('Contet-Type', 'application/json');
    console.log(headers);
    return this.http.post('http://localhost:3000/items/authenticate', user, {
      headers: headers,
      //observe: 'response'
    }).pipe(map((res: any) => res));
  }

  storeUserData(token:string, user:any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
}
