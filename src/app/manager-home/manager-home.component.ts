import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { client_table } from 'src/app/models/Clients';
import Swal from 'sweetalert2';
import { PropertyService } from 'src/app/services/property.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { currentId } from 'async_hooks';
import { ExptetionService } from 'src/app/services/exptetion.service';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { notifications_table } from 'src/app/models/Notifications';
import { NotificationService } from '../services/notification.service';
import { getLocaleMonthNames, getNumberOfCurrencyDigits } from '@angular/common';
import { subjects_table } from '../models/Subjects';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {
  clients: client_table[];
  cols: any[];
  flag: boolean;
  Notification: notifications_table[];
  items: any[];
  selectedClient: client_table;
  subject: subjects_table[];
  selectedNotification: notifications_table;

  constructor(private router: Router, private notificationService: NotificationService, private generalService: GeneralService, private clientsService: ClientsService, private propertyService: PropertyService, private exptetionService: ExptetionService) { }


  ngOnInit() {
    this.clientsService.GetClients().subscribe(data => {
      this.clients = data;
    })

    this.notificationService.getAllNotification().subscribe(x => {
      this.Notification = x;
    })
    this.generalService.getAllSubjects().subscribe(y => {
      this.subject = y;

    })



    this.flag = false;
    this.items = [

      { field: 'subject_code', header: 'נושא הפניה' },
      { field: 'text', header: 'הערות' },
      { field: 'email', header: 'אימייל משתמש' },
      { field: 'viewd', header: 'aa' }
    ];
    this.cols = [
      { field: 'client_name', header: 'שם פרטי' },
      { field: 'client_sure_name', header: 'שם משפחה' },
      { field: 'client_id', header: 'ת.זהות' },
      { field: 'client_email', header: 'אימייל' }
    ];
  }
  getSubjectNameById(id){
    var subject = this.subject && this.subject.find(s => s.subject_code == id);
    return subject && subject.subject;
  }
  onRowSelect(event) {
    this.selectedNotification = event.data;
    var alertProp;
    if (this.selectedNotification.client_id){
      var client = this.clients && this.clients.find(c => c.client_id == this.selectedNotification.client_id);
      alertProp = {
        title: 'פרטי משתמש',
        text: client.client_name,
        confirmButtonColor: '#3085d6',
        confirmButtonText: ''
      };
    }
      
    else
      alertProp = {
        title: 'משתמש לא קיים',
        confirmButtonColor: '#3085d6',
        confirmButtonText: ''
      };
    Swal.fire(alertProp);
  }
  deleteClient(selectedClient) {

    Swal.fire({
      title: '?אם אתה בטוח',
      text: "? אתה רוצה למחוק את המשתמש יחד עם כל נתוניו",

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.propertyService.DeletePropertyByClientID(this.selectedClient.client_id).subscribe(res => {
          this.exptetionService.DeleteExpecByClientID(this.selectedClient.client_id).subscribe(res => {
            this.clientsService.DeleteClient(this.selectedClient.client_id).subscribe(res => {
              var index = this.clients.findIndex(c => c.client_id == this.selectedClient.client_id);
              this.clients.splice(index, 1);
              this.selectedClient = null;
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            });

          });

        });

      }
    })


    {

    }
  }
  editClient(selectedClient) {
    this.router.navigate(['/add-property', this.selectedClient.client_id]);

  }

}
