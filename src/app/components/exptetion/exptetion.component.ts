
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectItem, MenuItem } from 'primeng/api';
import { CityService } from 'src/app/services/city.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-exptetion',
  templateUrl: './exptetion.component.html',
  styleUrls: ['./exptetion.component.css'],
  encapsulation: ViewEncapsulation.None
})

//  enum PROERTY_TYPES{
//   // 1 דירה
//   // 2 בית פרטי
//   // 3 דירת גן
//   // 4 קוטג'
//   // 5 פנטהאוז
//   // 6 דירת גג
//   // 7 דו-משפחתי
//  }
export class ExptetionComponent implements OnInit {

  area: any[];
  selectedCity: any;
  rangeValues: number[] = [20, 50];
  displayRangeValues: string[] = ["200,000", "5,000,000"];
  city: any;
  rooms: SelectItem[];
  selectedMeter: any;
  meters: SelectItem[];
  toMeters: SelectItem[];
  toRooms: SelectItem[];
  selectedM: any;
  items: MenuItem[];
  originalExpData: expectation_table;
  cities: SelectItem[];
  newUser: boolean = false;
  filteredCities: any[];
  types: any[] = [];

  expData: expectation_table = new expectation_table();






  constructor(private cityService: CityService,
    private generalService: GeneralService,
    private loginService: LoginService,
    private expetetionService: ExptetionService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    // this.expData.excp_client_code = this.loginService.getCurrentUser().client_id;
  }
  printRangeVlues() {
    console.log(this.rangeValues);
  }
  ngOnInit() {
    this.cities = [];
    this.cityService.GetCities().subscribe(cities => {
      this.cities = [{ label: '--בחר עיר--', value: null }, ...cities]
    });

    this.generalService.getAllPropertyType().subscribe(allType => {
      this.types = allType;
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

    this.area = [];
    this.generalService.getAllArea().subscribe(allArea => {
      this.area = allArea.map(t => { return { label: t.area_name, value: t.area_code } });
    });

    this.rooms = [];
    for (let i = 0; i < 10; i++) {
      this.rooms.push({ label: i + 1 + "", value: i + 1 })
    }
    this.meters = [];
    for (let i = 30; i < 500; i += 5) {
      this.meters.push({ label: i + "", value: i })
    }
    this.activatedRoute.params.subscribe(params => {
      var clientId = params.id;
      if (this.loginService.getCurrentUser()) {
        this.expetetionService.GetExpetByUserId(clientId).subscribe(
          data => {
            this.expData = data;
            this.displayRangeValues = [this.getFormattedNumber(this.expData.excp_min_price), this.getFormattedNumber(this.expData.excp_max_price)];
            this.rangeValues = [this.expData.excp_min_price, this.expData.excp_max_price];
            this.initUntilRooms();
            this.initUntilMeters();
            this.originalExpData = { ...data };
          },
          error => {
            this.expData.excp_client_code = clientId;
          });
      }
      else {
        this.newUser = true;
        this.expData.excp_client_code = clientId;
      }
    });
  }


  //  filterCity(event) {
  //  const query = event.query;
  //this.cityService.getCountries().then(countries => {
  //this.filteredCities = this.searchCity(query, countries);
  //    });
  // }



  initUntilMeters() {
    this.toMeters = this.meters.filter(x => x.value > this.expData.excp_min_square_meters);
    if (this.expData.excp_max_square_meters < this.expData.excp_min_square_meters)
      this.expData.excp_max_square_meters = null;
  }
  initUntilRooms() {
    this.toRooms = this.rooms.filter(x => x.value > this.expData.excp_min_rooms);
    if (this.expData.excp_max_rooms < this.expData.excp_min_rooms)
      this.expData.excp_max_rooms = null;
  }

  changeRangeValues(event) {
    this.displayRangeValues = [(event.values[0] * 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), (event.values[1] * 100000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")]
    this.expData.excp_min_price = event.values[0] * 10000;
    this.expData.excp_max_price = event.values[1] * 100000;
  }
  getFormattedNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  changeTypeValue(event, code) {
    if (event.checked) {
      this.expData.excp_type += code;
    }
    else {
      this.expData.excp_type -= code;
    }
  
    //אם בחרו מוסיפה למאפין את המספר שנבחר אם לא בחרו מורידה
  }
  getToPolicy() {
    this.router.navigate(['/policy', this.expData.excp_client_code]);
  }
  SubmitButton() {
    if (this.newUser) {
      this.expetetionService.AddExpectation(this.expData).subscribe((success => {
        this.router.navigate(['/policy', this.expData.excp_client_code]);
      }))
    }
    else {
      if (!_.isEqual(this.expData, this.originalExpData)) {
        this.expetetionService.UpdateExpectation(this.expData).subscribe(success => {
        })
      }
    }

  }
}
import { Pipe, PipeTransform } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { property_type_table } from 'src/app/models/PropertyTypes';
import { expectation_table } from 'src/app/models/Expectations';
import { LoginService } from 'src/app/services/login.service';
import { area_table } from 'src/app/models/Area';
import { ActivatedRoute, Router } from '@angular/router';
import { ExptetionService } from 'src/app/services/exptetion.service';

@Pipe({
  name: 'filterParam'
})
export class filterParam implements PipeTransform {
  transform(items: Array<any>, val: number): Array<any> {
    return items.filter(item => item.value > val);
  }
}
