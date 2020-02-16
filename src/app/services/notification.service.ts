import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { notifications_table } from '../models/Notifications';
import { BASE_SERVER_URL } from '../consts';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  AddNote(note:notifications_table): Observable<any>{
    return this.http.post<notifications_table>(BASE_SERVER_URL+'Notifications',note);

  }
//  getAllNotification():Observable<notifications_table[]>{
//     return this.http.get<notifications_table[]>(BASE_SERVER_URL + "Notifications/GetAllNotification" );}
getAllNotification(): Observable<notifications_table[]> {
  return this.http.get<notifications_table[]>(BASE_SERVER_URL + 'Notifications');
}
ChangeToRead(id:number):Observable<any>{
  return this.http.post<any>(BASE_SERVER_URL+'Notification/ChangeToRead', id);
}


}
