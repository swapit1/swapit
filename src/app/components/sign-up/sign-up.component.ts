import Swal from 'sweetalert2';
import { MenuItem, MessageService } from 'primeng/api';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IdValidator } from "src/app/custom-validators/idValidation";
import { ConfirmPassword } from 'src/app/custom-validators/ConfirmPassword';
import isIsraeliIdValid from 'israeli-id-validator';
import { client_table } from 'src/app/models/Clients';
import { ClientsService } from 'src/app/services/clients.service';
import { PropertyService } from 'src/app/services/property.service';
import { property_table } from 'src/app/models/Properties';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { CaptchaModule } from 'primeng/captcha';
import * as  _ from "lodash";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [MessageService],

  encapsulation: ViewEncapsulation.None

})
export class SignUpComponent implements OnInit {
  items: MenuItem[];
  userform: FormGroup;
  userData: client_table;
  originalUserData: client_table;
  verifyPassword: string;
  incorrectVerifyPassword: boolean;
  newUser: boolean = false;
  constructor(private router: Router, private fb: FormBuilder, private messageService: MessageService, private clientService: ClientsService, private PropertyService: PropertyService, private loginService: LoginService) {
    if (this.loginService.getCurrentUser()) {
      this.userData = { ...this.loginService.getCurrentUser() };
      this.originalUserData = { ...this.userData };
    }
    else {
      this.userData = new client_table();
      this.originalUserData = { ...this.userData };
      this.newUser = true;
    }
  }

  ngOnInit() {
    this.userform = this.fb.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      // , { validators: Validators.compose([Validators.required, IdValidator]), updateOn: 'blur' }
      'id': new FormControl('' ),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^((\\+|00)?972\-?|0)(([23489]|[57]\\d)\-?\\d{7})$')])),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])),
      'verifyPassword': new FormControl(''),
      'agree': new FormControl('')
    });

    this.items = [
      {
        label: 'פרטים אישיים'
      },
      {
        label: 'הבית שלך'
      },
      {
        label: 'מה אתה מחפש'
      },
      {
        label: 'תקנון האתר'
      }
    ];

  }
  showResponse(event) {

  }
  goToAddProperty() {
    this.router.navigate(['/add-property', this.userData.client_id]);
  }
  updateUser() {
    if (!_.isEqual(this.userData, this.originalUserData)) {
      this.clientService.UpdateClient(this.userData).subscribe(success => {
        this.loginService.setCurrentUser(this.userData);
        this.goToAddProperty();
      })
    }
    else {
      this.goToAddProperty();
    }
  }
  SubmitButton() {
    //check verify password
    if (this.verifyPassword == this.userData.client_password) {
      //TODO save
      //check if id exists
      if (this.loginService.getCurrentUser()) {
        //update
      }
      else {
        this.clientService.AddClient(this.userData).subscribe(
          (client: client_table) => {
            Swal.fire({
              title: 'ההרשמה בוצעה בהצלחה',

              type: 'success',
              showConfirmButton: false,
              timer: 2300,
              onClose: () => {
                this.userData = client;
                this.goToAddProperty();
              }
            });
          },
          (error) => {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
              title: 'שם משתמש או סיסמא קיימים',

              type: 'error',
              showCancelButton: true,
              confirmButtonText: 'חזרה להרשמה',
              cancelButtonText: 'יציאה',
              reverseButtons: true
            }).then((result) => {
              if (result.value) {
                this.userData = new client_table();
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Cancelled',
                  'Your imaginary file is safe :)',
                  'error'
                )
              }
            })
          });
      }

    }//if password correct
    else {
      this.incorrectVerifyPassword = true;

    }

    //TODO check all fields
  }
}
