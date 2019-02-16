/*import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/shareReplay';

//import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  login( rut: string, password: string ) {
    return this.http.post('/api/login', {rut, password})
      .pipe(tap(res => this.setSession))
      .shareReplay();
  }

  private setSession( authResult ) {
  //  const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify( expiresAt.valueOf() ));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
  //  return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    //return moment(expiresAt);
  }

}
*/