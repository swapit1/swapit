import { Component, OnInit, ViewEncapsulation, ViewChild, Directive } from '@angular/core';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { property_table } from 'src/app/models/Properties';
import { BASE_SERVER_URL } from 'src/app/consts';
import { PropertyService } from 'src/app/services/property.service';
import { LoginService } from 'src/app/services/login.service';
import { area_table } from 'src/app/models/Area';
import { condition_table } from 'src/app/models/Conditions';
import { HttpClient } from '@angular/common/http';

import { GeneralService } from 'src/app/services/general.service';
import { property_type_table } from 'src/app/models/PropertyTypes';
import { CityService } from 'src/app/services/city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from "node_modules/ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive";
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { ClientsService } from 'src/app/services/clients.service';




@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  providers: [MessageService],

  encapsulation: ViewEncapsulation.None
})
export class AddPropertyComponent implements OnInit {
  @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective;

  selectedStreet: any;

  cities: SelectItem[];
  selectedCity: any;

  areas: any[];
  selectedArea: any;

  types: any[];
  selectedType: any;

  conditions: any[];
  selectedCondition: any;

  selectedHouseNumber: any;
  selectedFlatNumber: any;
  selectedEntrance: any;
  selectedPrice: any;
  selectedFloor: any;
  selectedMeter: any;
  selectedRoom: any;
  selectedAirWay: any;

  uploadedFiles: File[] = [];
  uploadUrl: any;
  items: MenuItem[];
  propform: FormGroup;
  propdata: property_table = new property_table();
  clientId: string;
  meters: SelectItem[];
  rooms: SelectItem[];
  airWays: SelectItem[];
  service: any;
  newUser: boolean = false;
  originalPropData: property_table;

  constructor(private fb: FormBuilder, private http: HttpClient,
    private messageService: MessageService,
    private propertyService: PropertyService,
    private loginService: LoginService,
    private generalService: GeneralService,
    private cityService: CityService,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientsService,
    private router: Router) {

  }

  ngOnInit() {
    this.generalService.getAllArea().subscribe(allArea => {
      this.areas = allArea.map(t => { return { label: t.area_name, value: t.area_code } });
    });
    this.cityService.GetCities().subscribe(cities => {
      this.cities = [{ label: '--בחר עיר--', value: null }, ...cities]
    });
    this.generalService.getAllPropertyType().subscribe(allType => {
      this.types = allType.map(t => { return { label: t.propertytype_name, value: t.propertytype_code } });
    });
    this.generalService.getAllCondition().subscribe(allCondition => {
      this.conditions = allCondition.map(t => { return { label: t.condition_name, value: t.condition_code } });
    });
    this.activatedRoute.params.subscribe(params => {
      this.clientId = params.id;
      if (this.loginService.getCurrentUser()) {
        this.propertyService.GetPropByUserId(this.clientId).subscribe(
          data => {
            this.propdata = data;
            this.originalPropData = { ...data };
          },
          error => {
            this.propdata.property_client_code = this.clientId;
          });
      }
      else {
        this.newUser = true;
        this.propdata.property_client_code = this.clientId;
      }
    });
    // this.uploadUrl = BASE_SERVER_URL + "Property/?id=" + this.prop_code;


    this.propform = this.fb.group({
      // 'tog': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'area': new FormControl('', Validators.required),
      'type': new FormControl('', Validators.required),
      'condition': new FormControl('', Validators.required),
      'street': new FormControl('', Validators.required),
      'zipCode': new FormControl('', Validators.required),
      'houseNumber': new FormControl('', Validators.required),
      'flatNumber': new FormControl('', Validators.required),
      'entrance': new FormControl(),
      'price': new FormControl(),
      'floor': new FormControl(),
      'meter': new FormControl(),
      'room': new FormControl(),
      'airWay': new FormControl(),
      'storage': new FormControl(),
      'lift': new FormControl(),
      'airConditioning': new FormControl(),
      'disabledAccess': new FormControl(),
      'bars': new FormControl(),
      'safeRoom': new FormControl(),
      'parking': new FormControl(),
      'succa': new FormControl(),
      'housePrice': new FormControl()


    })

    this.meters = [];
    for (let i = 30; i <= 500; i += 5) {
      this.meters.push({ label: i + "", value: i })
    }
    this.rooms = [];
    for (let i = 0; i < 10; i++) {
      this.rooms.push({ label: i + 1 + "", value: i + 1 })
    }
    this.airWays = [];
    for (let i = 0; i < 4; i++) {
      this.airWays.push({ label: i + "", value: i })
    }

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

  myUploader(event) {
    this.propertyService.uploadFiles(this.clientId,event.files).subscribe(data => {
      debugger;
    })
  }

  displayWithCommas(event) {
    this.selectedPrice = (event.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  getToExpectation() {
    this.router.navigate(['/exptetion', this.propdata.property_client_code]);
  }
  SubmitButton() {
    if (this.newUser) {
      this.propertyService.AddProperty(this.propdata).subscribe((a_property => {
        this.getToExpectation();
      }))
    }
    else {
      if (!_.isEqual(this.propdata, this.originalPropData)) {
        this.propertyService.UpdateProperty(this.propdata).subscribe(success => {
          this.getToExpectation();
        })
      }
      else {
        this.getToExpectation();
      }
    }

  }
  handleAddressChange(address: any) {
    console.log(address)
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.lng());
    let latitude = address.geometry.location.lat();
    let longitude = address.geometry.location.lng();


    //  this.http.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.0860133,34.831885&radius=5000&type=bank&key=AIzaSyD5ivfn9WcgpMIA1EISkQsVfxM1KzsAmEQ')
    // // .pipe(map(response=>consresponse)
    // // .subscribe(data=>{
    // //       // coynsole.log("sucess "+JSON.stringify(data.results))
    // //      console.log(data)
    // // });}
    // // func(){
    // //   console.log(this.selectedArea.area_code);
    // // }
    // .pipe(map(
    //   data=>{
    //     console.log(data)
    //   }));}

  }
  onUpload(event){
    this.propertyService.uploadFiles(this.clientId,event.files).subscribe(success => {
      debugger;
    },
    error => {
      debugger;
    })
  }

}
