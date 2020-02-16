
import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PropertyService } from 'src/app/services/property.service';
import { map } from 'rxjs/operators';
import { property_table } from 'src/app/models/Properties';
import { Observable, merge } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'app-manager-view-properties',
  templateUrl: './manager-view-properties.component.html',
  styleUrls: ['./manager-view-properties.component.css']
})
export class ManagerViewPropertiesComponent implements OnInit, OnDestroy {


  sortOptions: SelectItem[];
  sortKey: any;
  propertiesList: any[]
  getPropertiesSubscriber: any;
  filterCityValue: string;
  filterRoomValue: string;
  @ViewChild('dv',{ read: false, static: false }) dataView;

  constructor(private propertyService: PropertyService, private loginService: LoginService, private router: Router) {
    this.getPropertiesSubscriber = this.propertyService.GetProperties().subscribe(data => {
      this.propertiesList = data;


      //getFirstImage מביאה תמונה ראשונה של כל דירה
      //this.propertyService.getFirstImage()
      this.propertyService.GetFirstImages().subscribe(images => {
        images.forEach(img => {
          let property = this.propertiesList.find(x => x.property_code == img.image_property_code);
          property.imgName = img.image_link;
        })
      })
    })
  }//end of ctor

  ngOnInit() {
    this.sortOptions = [];
    this.sortOptions.push({ label: 'מחיר נמוך לגבוה', value: { id: 1, name: 'מחיר נמוך לגבוה' } });
    this.sortOptions.push({ label: 'מחיר גבוה לנמוך', value: { id: 1, name: 'מחיר גבוה לנמוך' } });
  }
  DisplayNumberWithCommas(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  displayMoreData(property: property_table) {

    this.router.navigate(['/view-property', property.property_code]);
  }





  onTopbarSubItemClick(event) {
    event.preventDefault();
  }

  filter() {

    this.dataView.filteredValue = this.dataView.value.filter(x => (x.property_rooms == this.filterRoomValue || !this.filterRoomValue)
      && (x.property_city.includes(this.filterCityValue)))
  }

  ngOnDestroy(): void {
    this.getPropertiesSubscriber.unsubscribe();
  }




  
  }
  