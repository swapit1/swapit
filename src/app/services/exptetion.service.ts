import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BASE_SERVER_URL } from '../consts';
import { expectation_table } from '../models/Expectations';
@Injectable({
  providedIn: 'root'
})
export class ExptetionService {

  constructor(private http: HttpClient) {
  }
  DeleteExpecByClientID(id: string) {
    return this.http.delete(BASE_SERVER_URL + 'Exptetion/DeleteExpecByClientID/?ClientId=' + id);
  }
  GetExpetByUserId(id: string): Observable<expectation_table> {
    return this.http.get<expectation_table>(BASE_SERVER_URL + 'Exptetion/?id=' + id);
  }
  AddExpectation(exp: expectation_table): Observable<expectation_table> {
    return this.http.post<expectation_table>(BASE_SERVER_URL + "Exptetion", exp);
  }
  UpdateExpectation(expToUpdate: expectation_table) {
    return this.http.put(BASE_SERVER_URL + 'Exptetion/' + expToUpdate.excp_code, expToUpdate);
  }
}