import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { property_table } from '../models/Properties';
import { BASE_SERVER_URL } from '../consts';
import { image_table } from '../models/Images';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) {
  }
  AddProperty(prop: property_table): Observable<property_table> {
    return this.http.post<property_table>(BASE_SERVER_URL + "property", prop);
  }

  GetProperties(): Observable<property_table[]> {
    return this.http.get<property_table[]>(BASE_SERVER_URL + 'Property');
  }

  GetPropertyById(property_code: number): Observable<any> {
    return this.http.get<property_table>(BASE_SERVER_URL + 'property/?property_code=' + property_code);
  }

  uploadFiles(userId, files: File[]) {
    return this.http.post(BASE_SERVER_URL + "Property/?id=" + userId, files)
  }

  GetFirstImages() {
    return this.http.get<any[]>(BASE_SERVER_URL + 'property/?isActive=true');
  }

  GetUserImage(property_code: number): Observable<any> {
    return this.http.get<property_table>(BASE_SERVER_URL + 'property/GetUserImage/?property_code=' + property_code);
  }
  GetImagesForUser(property_code: number): Observable<image_table[]> {
    return this.http.get<image_table[]>(BASE_SERVER_URL + 'property/GetImagesForUser/?property_code=' + property_code);
  }
  GetPropByUserId(id: string): Observable<property_table> {
    return this.http.get<property_table>(BASE_SERVER_URL + 'property/?id=' + id);
  }

  GetMatches(currentUserId: string): Observable<property_table[]> {
    return this.http.get<property_table[]>(BASE_SERVER_URL + 'Property/GetMatches/?currentUserId=' + currentUserId);
  }
  DeletePropertyByClientID(id:string){
    return this.http.delete(BASE_SERVER_URL+'Property/DeletePropertyByClientID/?ClientId='+id);
  }
  UpdateProperty(PropToUpdate:property_table){
    return this.http.put(BASE_SERVER_URL+'Property/'+PropToUpdate.property_code,PropToUpdate);
  }
}
