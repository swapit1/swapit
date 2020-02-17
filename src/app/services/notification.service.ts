import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { notifications_table } from '../models/Notifications';
import { BASE_SERVER_URL } from '../consts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  AddNote(note: notifications_table): Observable<notifications_table> {
    return this.http.post<notifications_table>(BASE_SERVER_URL + 'Notifications', note);

  }
  getAllNotification(): Observable<notifications_table[]> {
    return this.http.get<notifications_table[]>(BASE_SERVER_URL + "Notifications/");
  }



}