import {Component, ViewEncapsulation} from '@angular/core';
import {AppComponent} from './app.component';
import { LoginService } from './services/login.service';
import { ClientsService } from './services/clients.service';
import { client_table } from './models/Clients';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.css'],
    encapsulation:ViewEncapsulation.None
})
export class AppTopbarComponent {
clients: client_table[]; 
constructor(public app: AppComponent, public loginService:LoginService,private clientService:ClientsService) {
this.clientService.GetClients().subscribe(data => {
        this.clients = data;})
}

logout(){
    this.loginService.clearCurrentUser();
    location.reload();
}
getShortName(client_name) { 
    return client_name;
  }
}
