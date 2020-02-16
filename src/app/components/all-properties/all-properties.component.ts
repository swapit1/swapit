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
  selector: 'app-all-properties',
  templateUrl: './all-properties.component.html',
  styleUrls: ['./all-properties.component.css']
})
export class AllPropertiesComponent implements OnInit, OnDestroy {

  sortOptions: SelectItem[];
  sortKey: any;
  propertiesList: any[]
  getPropertiesSubscriber: any;
  filterCityValue: string;
  filterRoomValue: string;
  managerConnected = false;
 
  sortField: string;

  sortOrder: number;
  @ViewChild('dv', { read: false, static: false }) dataView;

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
    if (this.loginService.isUserManager())
      this.managerConnected = true;
    this.sortOptions = [];
    this.sortOptions = [];
    this.sortOptions.push({ label: 'מחיר נמוך לגבוה', value: 'property_price' });
    this.sortOptions.push({ label: 'מחיר גבוה לנמוך', value: '!property_price' });
  }
  DisplayNumberWithCommas(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  displayMoreData(property: property_table) {

    this.router.navigate(['/view-property', property.property_code]);
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
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

  managerEdit(property){
    this.router.navigate(['/add-property', property.property_code]);
  }




}
