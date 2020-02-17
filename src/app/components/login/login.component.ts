import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userEmail: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.loginService.CheckUser(this.userEmail, this.password).subscribe(
      data => this.onSuccess(data), error => this.onError(error));
  }

  onSuccess(data) {
    sessionStorage.setItem("userId", data.client_id);
    if (this.loginService.isUserManager())
      this.router.navigate(['/managerHome']);
    else
      this.router.navigate(['/userView']);
  }

  onError(error) {
    alert("שם משתמש או סיסמא אינם תקינים");
    this.password = "";

  }
  forgotPassword() {
    this.loginService.SendEmailForgotPassword(this.userEmail).subscribe();
  }
  createAccount() {
    this.router.navigate(['/sign-up']);

  }

}
