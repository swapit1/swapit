import { Component, ViewEncapsulation } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppTopbarComponent {


    constructor(public app: AppComponent, public loginService: LoginService, private router: Router) { }
    logout() {
        this.loginService.clearCurrentUser();
        // location.reload();
        this.router.navigate(['/']);
    }
}
