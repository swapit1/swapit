import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { property_table } from 'src/app/models/Properties';
import { PropertyService } from 'src/app/services/property.service';
import { client_table } from 'src/app/models/Clients';
import { LoginService } from 'src/app/services/login.service';
import { property_type_table } from 'src/app/models/PropertyTypes';
import { GeneralService } from 'src/app/services/general.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { notifications_table } from 'src/app/models/Notifications';
import { notEqual } from 'assert';
import { NotificationService } from 'src/app/services/notification.service';
// import {} from '@types/googlemaps';

declare let google: any;

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {
  // propertyData: property_table;
  //@ViewChild('map') mapElement: any;
  // map: google.maps.Map;

  lat = 32.0860133;
  lng = 34.831885;
  zoom = 17;
  note:  notifications_table= new notifications_table;
  user: client_table = new client_table;
  imgLink: string;
  property: property_table;
  prop: property_type_table[];
  loaded:boolean;
  area:string;
  propType:string;
  service:any;
  pyrmont:any;//type
  condition:string;
  google:any;
  request: any;
  myMap:any;
  markers:any[];
  MARKER_PATH:string; 
  infoWindow: any;

  constructor(private activeRoute: ActivatedRoute,private notesService:NotificationService ,private propertyService: PropertyService, private loginService: LoginService, 
    private generalService:GeneralService) { }

  ngOnInit() {
    this.markers = [];
    this.MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';

    this.user = this.loginService.getCurrentUser();

    this.activeRoute.params.subscribe(data => {
      this.propertyService.GetPropertyById(Number.parseInt(data.id)).subscribe(propertyData => {
        this.property = propertyData;
        this.generalService.getAreaByID(this.property.property_area).subscribe(data=>{
          this.area=data;
        })
        this.generalService.getConditionByID(this.property.property_condition).subscribe(data=>{
          this.condition=data;
        })
        this.generalService.getTypeByID(this.property.property_type).subscribe(data=>{
          this.propType=data;
        })
        this.propertyService.GetUserImage(this.property.property_code).subscribe(img => {
          this.imgLink = img;
          this.loaded=true;
        })
      })
    })


  }
  DisplayNumberWithCommas(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // mapReady($event: any) { 
  //   // here $event will be of type google.maps.Map 
  //   // and you can put your logic here to get lat lng for marker. I have just put a sample code. You can refactor it the way you want.
  //   // this.getLatLong('ChIJN1t_tDeuEmsRUsoyG83frY4', $event, null);
  //   console.log($event)
  // }
  
  getLatLong(placeid: string, map: any, fn) {
      // let placeService = new google.maps.places.PlacesService(map);
      // placeService.getDetails({
      //   placeId: placeid
      //   }, function (result, status) {
      //     console.log(result.geometry.location.lat());
      //     console.log(result.geometry.location.lng())
      //   });
    }



 
  aa(event){
   this.service = new google.maps.places.PlacesService(event);
   //TODO get the lat and lng from server
   this.pyrmont = new google.maps.LatLng(32.0860133,34.831885);
   this.infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
   });
   this.myMap = event;
   this.request = {
    location: this.pyrmont,
    radius: 500,
    type: ''
  };
   //drop it and activate from buttons
   this.clickType('school');
 }

 clickType(chosenType){
   // if()
   this.request.type = 'school';
   // if()
  //  request.type= " ֵ"
   this.service.nearbySearch(this.request, this.callback.bind(this));
 }

 clearMarkers() {
  for (var i = 0; i < this.markers.length; i++) {
    if (this.markers[i]) {
      this.markers[i].setMap(null);
    }
  }
  this.markers = [];
}

clearResults() {
  var results = document.getElementById('results');
  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}

addResult(result, i) {
  var results = document.getElementById('results');
  var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
  var markerIcon = this.MARKER_PATH + markerLetter + '.png';

  var tr = document.createElement('tr');
  tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
  tr.onclick = function() {
    // google.maps.event.trigger(this.markers[i], 'click');
  };

  var iconTd = document.createElement('td');
  var nameTd = document.createElement('td');
  var icon = document.createElement('img');
  icon.src = markerIcon;
  icon.setAttribute('class', 'placeIcon');
  icon.setAttribute('className', 'placeIcon');
  var name = document.createTextNode(result.name);
  iconTd.appendChild(icon);
  nameTd.appendChild(name);
  tr.appendChild(iconTd);
  tr.appendChild(nameTd);
  results.appendChild(tr);
}

dropMarker(i) {
  return function() {
    this.markers[i].setMap(this.myMap);
  };
}

 callback(results, status) {
   if (status == google.maps.places.PlacesServiceStatus.OK) {
    // console.log(results)
    this.clearResults();
    this.clearMarkers();
    // Create a marker for each hotel found, and
    // assign a letter of the alphabetic to each marker icon.
    for (var i = 0; i < results.length; i++) {
      var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
      var markerIcon = this.MARKER_PATH + markerLetter + '.png';
      // Use marker animation to drop the icons incrementally on the map.
      this.markers[i] = new google.maps.Marker({
        position: results[i].geometry.location,
        animation: google.maps.Animation.DROP,
        icon: markerIcon
      });
      // If the user clicks a hotel marker, show the details of that hotel
      // in an info window.
      this.markers[i].placeResult = results[i];
      google.maps.event.addListener(this.markers[i], 'click', this.showInfoWindow.bind(this.markers[i]));
      setTimeout(this.dropMarker(i).bind(this), i * 100);
      this.addResult(results[i], i);
    }
   }
  }

  showInfoWindow() {
    var marker = this;
    // this.service.getDetails({placeId: marker.placeResult.place_id},
        // function(place, status) {
        //   if (status !== google.maps.places.PlacesServiceStatus.OK) {
        //     return;
        //   }
        //   this.infoWindow.open(map, marker);
        //   this.buildIWContent(place);
        // });
  }

  buildIWContent(place) {
    document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
        'src="' + place.icon + '"/>';
    document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
        '">' + place.name + '</a></b>';
    document.getElementById('iw-address').textContent = place.vicinity;

    if (place.formatted_phone_number) {
      document.getElementById('iw-phone-row').style.display = '';
      document.getElementById('iw-phone').textContent =
          place.formatted_phone_number;
    } else {
      document.getElementById('iw-phone-row').style.display = 'none';
    }

    // Assign a five-star rating to the hotel, using a black star ('&#10029;')
    // to indicate the rating the hotel has earned, and a white star ('&#10025;')
    // for the rating points not achieved.
    if (place.rating) {
      var ratingHtml = '';
      for (var i = 0; i < 5; i++) {
        if (place.rating < (i + 0.5)) {
          ratingHtml += '&#10025;';
        } else {
          ratingHtml += '&#10029;';
        }
      document.getElementById('iw-rating-row').style.display = '';
      document.getElementById('iw-rating').innerHTML = ratingHtml;
      }
    } else {
      document.getElementById('iw-rating-row').style.display = 'none';
    }

    // The regexp isolates the first part of the URL (domain plus subdomain)
    // to give a short URL for displaying in the info window.
    if (place.website) {
      var fullUrl = place.website;
      // var website = hostnameRegexp.exec(place.website);
      // if (website === null) {
        // website = 'http://' + place.website + '/';
        // fullUrl = website;
      }
    //   document.getElementById('iw-website-row').style.display = '';
    //   document.getElementById('iw-website').textContent = website;
    // } else {
    //   document.getElementById('iw-website-row').style.display = 'none';
    // }
  }
  showInterest(){
   this.note.subject_code=6;
   this.note.client_id=this.user.client_id;
   this.note.email=this.user.client_email;
   this.note.isRead=false;
   this.note.name=this.user.client_name+" "+this.user.client_sure_name;
   this.note.phone=this.user.client_phone;
   this.note.text=this.property.property_client_code+" "+"קוד דירה מוצעת"+" "+this.property.property_code+" "+"ת.ז לקוח בעל דירה מוצעת"
   this.notesService.AddNote(this.note).subscribe(success => {
    Swal.fire(
      
      'פנייתך נשלחה בהצלחה',
      'ניצור איתך קשר בהקדם'
    )
  },
  error => {
    'לא נשלח'
  }

);
} 
   createMarker(location, map) {
     // Add the marker at the clicked location, and add the next-available label
     // from the array of alphabetical characters.
     var marker = new google.maps.Marker({
       position: location,
       map: map
     });
 }
}
