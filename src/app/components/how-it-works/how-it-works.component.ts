import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {GMapModule} from 'primeng/gmap';


@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css',
  
  ]
})
export class HowItWorksComponent implements OnInit {
options: any;
overlays: any[];

  constructor() { }

  ngOnInit() {

  //   this.options = {
  //     center: {lat: 36.890257, lng: 30.707417},
  //     zoom: 12
  // };
}
 
  
  

}
