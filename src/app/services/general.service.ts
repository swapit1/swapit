import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { area_table } from '../models/Area';
import { BASE_SERVER_URL } from '../consts';

import { property_type_table } from '../models/PropertyTypes';
import { condition_table } from '../models/Conditions';
import { subjects_table } from '../models/Subjects';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }
  getAllArea():Observable<area_table[]>{
    return this.http.get<area_table[]>(BASE_SERVER_URL + "General/GetAllArea");
  }

  getAllCondition():Observable<condition_table[]>{
    return this.http.get<condition_table[]>(BASE_SERVER_URL + "General/GetAllCondition");
  }

  
  getAllPropertyType():Observable<property_type_table[]>{
    return this.http.get<property_type_table[]>(BASE_SERVER_URL + "General/GetAllPropertyType");
  }

  getAllSubjects():Observable<subjects_table[]>{
    return this.http.get<subjects_table[]>(BASE_SERVER_URL + "General/GetAllSubjects");
  }

  getAreaByID(id:number):Observable<string>{
    return this.http.get<string>(BASE_SERVER_URL + "General/GetAreaByID/?id=" + id);
  }
  

  getTypeByID(id:number):Observable<string>{
    return this.http.get<string>(BASE_SERVER_URL + "General/getTypeByID/?id=" + id);
  }
  getConditionByID(id:number):Observable<string>{
    return this.http.get<string>(BASE_SERVER_URL + "General/getConditionByID/?id=" + id);
  }
}
