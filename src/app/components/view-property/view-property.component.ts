import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { property_table } from 'src/app/models/Properties';
import { PropertyService } from 'src/app/services/property.service';
import { client_table } from 'src/app/models/Clients';
import { LoginService } from 'src/app/services/login.service';
import { property_type_table } from 'src/app/models/PropertyTypes';
import { GeneralService } from 'src/app/services/general.service';
import { image_table } from 'src/app/models/Images';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {
  google: any;

  // propertyData: property_table;
  //@ViewChild('map') mapElement: any;
  // map: google.maps.Map;

  lat = 32.0860133;
  lng = 34.831885;
  zoom = 17;

  user: client_table = new client_table;
  allImg: any[];
  property: property_table;
  prop: property_type_table[];
  loaded: boolean;
  area: string;
  propType: string;
  condition: string;
  pyrmont: any;
  service: any;
  constructor(private activeRoute: ActivatedRoute, private propertyService: PropertyService, private loginService: LoginService,
    private generalService: GeneralService) { }

  ngOnInit() {
    this.user = this.loginService.getCurrentUser();

    this.activeRoute.params.subscribe(data => {
      this.propertyService.GetPropertyById(Number.parseInt(data.id)).subscribe(propertyData => {
        this.property = propertyData;
        this.generalService.getAreaByID(this.property.property_area).subscribe(data => {
          this.area = data;
        })
        this.generalService.getConditionByID(this.property.property_condition).subscribe(data => {
          this.condition = data;
        })
        this.generalService.getTypeByID(this.property.property_type).subscribe(data => {
          this.propType = data;
        })
        this.propertyService.GetImagesForUser(this.property.property_code).subscribe(allImg => {
          this.allImg = allImg.map(img => {
            return { source: "http://localhost:59069//Userproperty//" + img.image_link, alt: img.image_name,title: ''};
          });
          this.loaded = true;
        })
      })
    })



  }
  DisplayNumberWithCommas(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  aa(event) {

    this.service = new google.maps.places.PlacesService(event);
    this.pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
    
    };

   
  clickType() {
    var request = {
      location: this.pyrmont,
      radius: 500,
      type: 'school'
    };

    

  }
  callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        // createMarker(results[i]);

      }
      console.log(place);
    }
  }




}
