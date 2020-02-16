import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { client_table } from 'src/app/models/Clients';
import { LoginService } from 'src/app/services/login.service';
import { subjects_table } from 'src/app/models/Subjects';
import { GeneralService } from 'src/app/services/general.service';
import { notifications_table } from 'src/app/models/Notifications';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  categories: subjects_table[];
  selectedSubject: subjects_table;
  currentUser: client_table;
  name: string;

  note: notifications_table;


  constructor(private router:Router,private loginService: LoginService, private generalService: GeneralService, private notesService: NotificationService) {


  }
  ngOnInit() {
    this.note = new notifications_table();

    this.categories = [];
    this.generalService.getAllSubjects().subscribe(data => {
      this.categories = data;
    });
    if (this.loginService.getCurrentUser()) {
      this.currentUser = this.loginService.getCurrentUser();
      this.note.name = this.currentUser.client_name +" " +this.currentUser.client_sure_name;
      this.note.client_id = this.currentUser.client_id;
      this.note.email = this.currentUser.client_email;
      this.note.phone = this.currentUser.client_phone;
    }
  }
  res: boolean;
  send() {
    // this.note.subject_code = this.note.subject_code.subject
    this.note.subject_code = this.selectedSubject.subject_code;
    this.notesService.AddNote(this.note).subscribe(
      success => {
        Swal.fire(
          
          'פנייתך נשלחה בהצלחה',
          'ניצור איתך קשר בהקדם'
        )
      this.router.navigate(['/']);
      },
      error => {
        'לא נשלח'
      }
    );;
  }
}