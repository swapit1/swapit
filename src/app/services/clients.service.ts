import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { client_table } from '../models/Clients';
import { Observable } from 'rxjs';
import { BASE_SERVER_URL } from '../consts';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient:HttpClient) { }

GetClient(id:string, email:string ):Observable<boolean>{
return this.httpClient.get<boolean>(BASE_SERVER_URL+ 'client/?id=' + id + "&email=" + email+'&num=5');
}

  GetClients():Observable<client_table[]>{
    return this.httpClient.get<client_table[]>(BASE_SERVER_URL+'Client');
  }

  AddClient(newClient:client_table){
    return this.httpClient.post(BASE_SERVER_URL+'Client',newClient);
  }

  UpdateClient(ClientToUpdate:client_table){
    return this.httpClient.put(BASE_SERVER_URL+'Client/'+ClientToUpdate.client_id,ClientToUpdate);
  }

  DeleteClient(id:string){
    return this.httpClient.delete(BASE_SERVER_URL+'Client/'+id);
  }
 
}
