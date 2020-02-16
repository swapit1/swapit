import { Injectable, ɵConsole } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BASE_SERVER_URL } from '../consts';
import { Observable } from 'rxjs';
import { client_table } from '../models/Clients';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser: client_table;
  Manager: boolean;
  constructor(private http: HttpClient) { }
  CheckUser(client_email: string, client_password): Observable<client_table> {
    return this.http.get<client_table>(BASE_SERVER_URL + 'client/?userEmail=' + client_email + "&password=" + client_password).pipe(
      map(data => {
        if (data) {
          this.setCurrentUser(data);
          this.setManager(data);
          return this.currentUser;
        }
        return null;
      }))
  }

  getCurrentUser() {
    if (!this.currentUser) {
      var user = localStorage.getItem('user');
      this.currentUser = user && JSON.parse(user);
    }
    return this.currentUser;
  }
  setCurrentUser(user) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }
  setManager(user) {
    if ((this.currentUser != null && this.currentUser.client_id == '111111111') || false) {
    this.Manager = true;
     
    }
    else
      this.Manager = false;
  }
  clearCurrentUser() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  isUserManager() {
    if ((this.Manager==true) || ((this.currentUser != null && this.currentUser.client_id == '111111111') || false))
      return true;
    return false;
  }

  SendEmailForgotPassword(email: string) {
    //return this.http.post(BASE_SERVER_URL+'client/?email='+email);
    return this.http.post(BASE_SERVER_URL + "client/?id=" + email, {});
  }
}



