import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { client_table } from '../models/Clients';
import { Observable } from 'rxjs';
import { BASE_SERVER_URL } from '../consts';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) { }

  GetClient(id: string, email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(BASE_SERVER_URL + 'client/?id=' + id + "&email=" + email + '&num=5');
  }

  GetClients(): Observable<client_table[]> {
    return this.httpClient.get<client_table[]>(BASE_SERVER_URL + 'Client');
  }
  checkIfIdExist(id: string): Observable<boolean> {
    return this.httpClient.get<boolean>(BASE_SERVER_URL + 'Client/checkIfIdExist/?id=' + id);
  }

  AddClient(newClient: client_table): Observable<client_table> {
    return this.httpClient.post<client_table>(BASE_SERVER_URL + 'Client', newClient);
  }

  UpdateClient(ClientToUpdate: client_table) {
    return this.httpClient.put(BASE_SERVER_URL + 'Client/' + ClientToUpdate.client_id, ClientToUpdate);
  }

  DeleteClient(id:string){
    return this.httpClient.delete(BASE_SERVER_URL+'Client/'+id);
  }

  uploadSignature(clientId, files) {
    const formData: FormData = new FormData();
    files.forEach(element => {
      
      formData.append('file', element, element.name);
    });

    return this.httpClient.post(BASE_SERVER_URL + "Client/SaveSignature/?id=" + clientId, formData);
  }
}
